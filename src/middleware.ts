import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_ORG_ID = process.env.ADMIN_ORG_ID

function isAdminRoute(req: NextRequest): boolean {
  return req.nextUrl.pathname.startsWith('/admin')
}

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const authResult = await auth()

    if (!authResult.userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (authResult.orgId !== ADMIN_ORG_ID) {
      return new NextResponse('Forbidden: You must be a member of the allowed organization', {
        status: 403,
      })
    }
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