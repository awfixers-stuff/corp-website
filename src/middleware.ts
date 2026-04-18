import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

import { routeAccess, checkAccess, type AccessPattern } from './access/routes'

const PUBLIC_ROUTES = ['/', '/about', '/contact', '/sign-in', '/sign-up']
const BOT_SIGNATURES = [
  /bot/i,
  /spider/i,
  /crawl/i,
  /slurp/i,
  /mediapartners/i,
  /googlebot/i,
  /bingbot/i,
  /duckduckbot/i,
  /applebot/i,
  /semrush/i,
  /ahrefs/i,
  /mj12bot/i,
  /ptst/i,
  /25980/i,
  /^(?!.*(Chrome|Chromium|Firefox|Safari|Edge)).*$/i,
]

function isBotRequest(req: NextRequest): boolean {
  const userAgent = req.headers.get('user-agent') || ''
  const forwardedFor = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')

  if (userAgent && BOT_SIGNATURES.some(sig => sig.test(userAgent))) {
    return true
  }

  if (!userAgent || userAgent.length === 0) {
    return true
  }

  if (forwardedFor && forwardedFor.split(',').length > 5) {
    return true
  }

  return false
}

function getAccessPattern(pathname: string): AccessPattern | undefined {
  for (const [route, pattern] of Object.entries(routeAccess)) {
    if (route === '/') {
      if (pathname === '/') return pattern
      continue
    }
    if (pathname.startsWith(route)) return pattern
  }
  return undefined
}

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname
  const accessPattern = getAccessPattern(pathname)

  if (!accessPattern) {
    return NextResponse.next()
  }

  if (accessPattern.type === 'public') {
    return NextResponse.next()
  }

  if (isBotRequest(req)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const authResult = await auth()
  const { userId, orgId } = authResult

  const hasAccess = checkAccess(accessPattern, userId, orgId ?? null)

  if (!hasAccess) {
    if (!userId) {
      return auth().redirectToSignIn({ returnBackUrl: pathname })
    }

    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}