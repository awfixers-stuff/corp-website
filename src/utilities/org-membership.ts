export type OrgRole = 'admin' | 'investor' | 'member' | 'none'

export function getOrgRole(orgId: string | null): OrgRole {
  if (!orgId) return 'none'
  if (orgId === process.env.ADMIN_ORG_ID) return 'admin'
  if (orgId === process.env.INVESTOR_ORG_ID) return 'investor'
  return 'member'
}

export function isAdmin(orgId: string | null): boolean {
  return getOrgRole(orgId) === 'admin'
}

export function isInvestor(orgId: string | null): boolean {
  return getOrgRole(orgId) === 'investor'
}