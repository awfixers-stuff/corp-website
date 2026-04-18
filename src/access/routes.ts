export type AccessPattern =
  | { type: 'public' }
  | { type: 'authenticated' }
  | { type: 'org'; orgId: string }
  | { type: 'orgPrefix'; prefix: string }
  | { type: 'orgs'; orgIds: string[] }

export type RouteAccessMap = Record<string, AccessPattern>

export const routeAccess: RouteAccessMap = {
  '/': { type: 'public' },
  '/admin': { type: 'org'; orgId: process.env.ADMIN_ORG_ID! },
  '/dashboard': { type: 'authenticated' },
}

export function checkAccess(
  access: AccessPattern,
  userId: string | null,
  orgId: string | null,
): boolean {
  switch (access.type) {
    case 'public':
      return true
    case 'authenticated':
      return !!userId
    case 'org':
      return orgId === access.orgId
    case 'orgPrefix':
      return orgId?.startsWith(access.prefix) ?? false
    case 'orgs':
      return orgId != null && access.orgIds.includes(orgId)
    default:
      return false
  }
}