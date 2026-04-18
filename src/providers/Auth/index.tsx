'use client'

import { useAuth as useClerk, useOrganization, useUser } from '@clerk/nextjs'
import posthog from 'posthog-js'
import React, { createContext, use, useEffect, useState } from 'react'

import type { User } from '../../payload-types'
import { isAdmin as checkIsAdmin } from '../../utilities/org-membership'

type AuthContext = {
  logout: () => Promise<void>
  user: null | User
  orgId: string | null
  isAdmin: boolean
}

const Context = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, userId } = useClerk()
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser()
  const { organization } = useOrganization()
  const [user, setUser] = useState<null | User>(null)
  const [isAdminState, setIsAdminState] = useState(false)

  const orgId = organization?.id ?? null

  useEffect(() => {
    if (!isLoaded || !isUserLoaded) {
      return
    }

    if (userId && clerkUser) {
      const email = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId,
      )?.emailAddress

      setUser({
        id: userId,
        email: email || '',
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
      } as User)

      posthog.identify(userId, {
        email: email || '',
        firstName: clerkUser.firstName || '',
        lastName: clerkUser.lastName || '',
      })
    } else {
      setUser(null)
    }
  }, [isLoaded, isUserLoaded, userId, clerkUser])

  useEffect(() => {
    if (!isLoaded || !userId || !orgId) {
      setIsAdminState(false)
      return
    }

    setIsAdminState(checkIsAdmin(orgId))
  }, [userId, orgId, isLoaded])

  const isAdmin = isAdminState

  const logout = async () => {
    // Clerk handles logout - redirect to sign-in
  }

  return <Context.Provider value={{ logout, user, orgId, isAdmin }}>{children}</Context.Provider>
}

export function useAuth() {
  const { user, logout, ...rest } = use(Context)
  return { user, logout, ...rest }
}