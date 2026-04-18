'use client'

import { useAuth as useClerk, useUser } from '@clerk/nextjs'
import React, { createContext, use, useEffect, useState } from 'react'

import type { User } from '../../payload-types'

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
  const [user, setUser] = useState<null | User>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  const orgId = clerkUser?.organizationMemberships.find(
    (m) => m.organization.id === clerkUser?.organizationId,
  )?.organization.id ?? null

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
    } else {
      setUser(null)
    }
  }, [isLoaded, isUserLoaded, userId, clerkUser])

  useEffect(() => {
    if (!userId || !orgId) {
      setIsAdmin(false)
      return
    }

    fetch('/api/auth/is-admin')
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.isAdmin === true)
      })
      .catch(() => {
        setIsAdmin(false)
      })
  }, [userId, orgId])

  const logout = async () => {
    // Clerk handles logout - redirect to sign-in
  }

  return <Context.Provider value={{ logout, user, orgId, isAdmin }}>{children}</Context.Provider>
}

export function useAuth() {
  const { user, logout, ...rest } = use(Context)
  return { user, logout, ...rest }
}