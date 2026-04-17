import type { Metadata } from 'next'

import { GoogleTagManager } from '@components/Analytics/GoogleTagManager/index'
import { PrivacyBanner } from '@components/PrivacyBanner/index'
import { Providers } from '@providers/index'
import { PrivacyProvider } from '@root/providers/Privacy/index'
import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'
import { GeistMono } from 'geist/font/mono'
import React from 'react'

import { untitledSans } from './fonts'
import '../../css/app.scss'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PrivacyProvider>
        <head>
          <link href="/images/favicon.svg" rel="icon" />
          <link href="https://api.github.com/repos/awfixers-stuff/payload" rel="dns-prefetch" />
          <link href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" rel="stylesheet" />
          <link href="https://www.googletagmanager.com" rel="preconnect" />
        </head>
        <body className={[GeistMono.variable, untitledSans.variable].join(' ')}>
          <GoogleTagManager />
          <Providers>
            {children}
            <PrivacyBanner />
          </Providers>
        </body>
      </PrivacyProvider>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://corp.awfixer.me'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@awfixers-stuff',
  },
}
