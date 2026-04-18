import type { PayloadConvexConfig } from 'payload-convex-adapter'

export const payloadConvexConfig: PayloadConvexConfig = {
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexDeployment: process.env.CONVEX_DEPLOYMENT!,
  prefix: 'corp_website',
}