// @ts-expect-error - payload is loaded dynamically
const payload = (await import('payload')).default

export async function POST() {
  try {
    return Response.json({ user: null })
  } catch {
    return Response.json({ user: null })
  }
}
