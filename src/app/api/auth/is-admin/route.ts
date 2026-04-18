import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId, orgId } = await auth()

    if (!userId || !orgId) {
      return NextResponse.json({ isAdmin: false })
    }

    const adminOrgId = process.env.ADMIN_ORG_ID
    const isAdmin = adminOrgId ? orgId === adminOrgId : false

    return NextResponse.json({ isAdmin })
  } catch {
    return NextResponse.json({ isAdmin: false })
  }
}