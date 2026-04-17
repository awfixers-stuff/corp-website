import { cookies } from 'next/headers'

// @ts-expect-error - payload is loaded dynamically
const payload = (await import('payload')).default

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return Response.json({ message: 'Email and password are required' }, { status: 400 })
    }

    const result = await payload.login({
      collection: 'users',
      data: { email, password },
    })

    if (!result.user) {
      return Response.json({ message: 'Invalid login credentials' }, { status: 401 })
    }

    const cookieStore = await cookies()
    if (result.cookies) {
      for (const cookie of result.cookies as string[]) {
        const [nameValue] = cookie.split(';')
        const [cookieName, cookieValue] = nameValue.split('=')
        const options = cookie.split(';').slice(1).join(';').trim()

        cookieStore.set(cookieName, cookieValue, {
          httpOnly: true,
          path: '/',
        })
      }
    }

    return Response.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        roles: result.user.roles,
        photo: result.user.photo,
        twitter: result.user.twitter,
      },
    })
  } catch {
    return Response.json({ message: 'Invalid login credentials' }, { status: 401 })
  }
}
