'use client'

import { useAuth as useClerk, useUser } from '@clerk/nextjs'
import React, { createContext, use, useEffect, useState } from 'react'

import type { User } from '../../payload-types'

type AuthContext = {
  logout: () => Promise<void>
  user: null | User
}

const Context = createContext<AuthContext>({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, userId } = useClerk()
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser()
  const [user, setUser] = useState<null | User>(null)

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

  const logout = async () => {
    // Clerk handles logout - redirect to sign-in
  }

  return <Context.Provider value={{ logout, user }}>{children}</Context.Provider>
}

export const useAuth = () => use(Context)