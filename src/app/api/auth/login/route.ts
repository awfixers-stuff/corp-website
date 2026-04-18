import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    const clerk = await clerkClient()

    if (!userId) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
    }

    const user = await clerk.users.getUser(userId)

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
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
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Authentication failed' }, { status: 500 })
  }
}