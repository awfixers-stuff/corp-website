import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'node:url'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { redirects } from './redirects.js'

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const localhost = process.env.NEXT_PUBLIC_IS_LIVE
  ? []
  : [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: 'local.corp.awfixer.me',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: 'cms.local.corp.awfixer.me',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'cms.local.corp.awfixer.me',
        port: '8001',
      },
    ]

const nextConfig = withBundleAnalyzer({
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year,
    remotePatterns: [
      ...localhost,
      {
        protocol: 'https',
        hostname: 'cms.corp.awfixer.me',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cloud-api.corp.awfixer.me',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cms.local.corp.awfixer.me',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'stage.cms.corp.awfixer.me',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: process.env.BLOB_STORE_ID || '',
      },
    ].filter(Boolean).filter(p => p.hostname && p.hostname !== ''),
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'], // https://github.com/vercel/next.js/issues/71638
  },
  turbopack: {
    resolveAlias: {
      '@scss': path.resolve(dirname, './src/css/'),
      '@components': path.resolve(dirname, './src/components.js'),
      '@forms': path.resolve(dirname, './src/forms'),
      '@blocks': path.resolve(dirname, './src/blocks'),
      '@providers': path.resolve(dirname, './src/providers'),
      '@icons': path.resolve(dirname, './src/icons'),
      '@utilities': path.resolve(dirname, './src/utilities'),
      '@types': path.resolve(dirname, './payload-types.ts'),
      '@graphics': path.resolve(dirname, './src/graphics'),
      '@graphql': path.resolve(dirname, './src/graphql'),
    },
  },
  webpack: (config) => {
    const configCopy = { ...config }
    configCopy.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      extensionAlias: {
        '.js': ['.ts', '.js', '.tsx', '.jsx'],
        '.mjs': ['.mts', '.mjs'],
      },
      alias: {
        ...config.resolve.alias,
        '@scss': path.resolve(dirname, './src/css/'),
        '@components': path.resolve(dirname, './src/components.js'),
        '@forms': path.resolve(dirname, './src/forms'),
        '@blocks': path.resolve(dirname, './src/blocks'),
        '@providers': path.resolve(dirname, './src/providers'),
        '@icons': path.resolve(dirname, './src/icons'),
        '@utilities': path.resolve(dirname, './src/utilities'),
        '@types': path.resolve(dirname, './payload-types.ts'),
        '@graphics': path.resolve(dirname, './src/graphics'),
        '@graphql': path.resolve(dirname, './src/graphql'),
      },
    }
    return configCopy
  },
  redirects,
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ]
  },
  async headers() {
    const headers = [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "object-src 'none';base-uri 'self';form-action 'self';",
          },
        ],
      },
    ]

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      })
    }
    return headers
  },
})

export default withPayload(nextConfig, { devBundleServerPackages: false })


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "awfixerholdings",
  project: "corpsite",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
