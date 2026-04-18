import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: '/ingest',
  capture_exceptions: true,
  debug: process.env.NODE_ENV === 'development',
  defaults: '2026-01-30',
  ui_host: 'https://us.posthog.com',
})
