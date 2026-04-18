import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ user: null })
    }

    const clerk = await clerkClient()
    const user = await clerk.users.getUser(userId)

    if (!user) {
      return NextResponse.json({ user: null })
    }

    const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress

    return NextResponse.json({
      user: {
        id: userId,
        email: email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      },
    })
  } catch {
    return NextResponse.json({ user: null })
  }
}