'use client'

import { ME_QUERY } from '@data/me'
import React, { createContext, use, useCallback, useEffect, useRef, useState } from 'react'

import type { User } from '../../payload-types'

type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<void>

type ForgotPassword = (args: { email: string }) => Promise<void>

type Login = (args: { email: string; password: string }) => Promise<User>

type Logout = () => Promise<void>

type AuthContext = {
  forgotPassword: ForgotPassword
  login: Login
  logout: Logout
  resetPassword: ResetPassword
  setUser: (user: null | User) => void
  updateUser: (user: Partial<User>) => void
  user?: null | User
}

const Context = createContext({} as AuthContext)

const AUTH_ERROR = 'An error occurred while attempting to authenticate'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<null | undefined | User>(undefined)
  const fetchedMe = useRef(false)

  const login = useCallback<Login>(async (args) => {
    try {
      const res = await fetch('/api/auth/login', {
        body: JSON.stringify(args),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (res.ok) {
        const userData = await res.json()
        setUser(userData.user)
        return userData.user
      }

      const error = await res.json()
      throw new Error(error.message || 'Invalid login credentials')
    } catch (e) {
      throw new Error(`${AUTH_ERROR}: ${e.message}`)
    }
  }, [])

  const logout = useCallback<Logout>(async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        credentials: 'include',
        method: 'POST',
      })

      if (res.ok) {
        setUser(null)
      } else {
        throw new Error('An error occurred while attempting to logout.')
      }
    } catch (e) {
      throw new Error(`${AUTH_ERROR}: ${e.message}`)
    }
  }, [])

  useEffect(() => {
    if (fetchedMe.current) {
      return
    }
    fetchedMe.current = true

    const fetchMe = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
          method: 'POST',
        })

        if (res.ok) {
          const userData = await res.json()
          setUser(userData.user || null)
        } else {
          setUser(null)
        }
      } catch (e) {
        setUser(null)
        if (process.env.NEXT_PUBLIC_OMIT_CLOUD_ERRORS === 'true') {
          return
        }
        throw new Error(`${AUTH_ERROR}: ${e.message}`)
      }
    }

    fetchMe()
  }, [])

  const forgotPassword = useCallback<ForgotPassword>(async (args) => {
    try {
      const res = await fetch('/api/auth/forgot-password', {
        body: JSON.stringify(args),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(
          error.message || 'An error occurred while attempting to reset your password.',
        )
      }
    } catch (e) {
      throw new Error(`${AUTH_ERROR}: ${e.message}`)
    }
  }, [])

  const resetPassword = useCallback<ResetPassword>(async (args) => {
    try {
      const res = await fetch('/api/auth/reset-password', {
        body: JSON.stringify(args),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Invalid token')
      }

      const userData = await res.json()
      setUser(userData.user)
    } catch (e) {
      throw new Error(`${AUTH_ERROR}: ${e.message}`)
    }
  }, [])

  const updateUser = useCallback(
    async (incomingUser: Partial<User>) => {
      try {
        if (!user || !incomingUser) {
          throw new Error('No user found to update.')
        }

        const res = await fetch(`/api/collections/users/${user.id}`, {
          body: JSON.stringify(incomingUser),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        })

        if (res.ok) {
          const updatedUser = await res.json()
          setUser(updatedUser.doc)
        } else {
          throw new Error('An error occurred while updating your account.')
        }
      } catch (e) {
        throw new Error(`${AUTH_ERROR}: ${e.message}`)
      }
    },
    [user],
  )

  return (
    <Context
      value={{
        forgotPassword,
        login,
        logout,
        resetPassword,
        setUser,
        updateUser,
        user,
      }}
    >
      {children}
    </Context>
  )
}

type UseAuth<T = User> = () => AuthContext

export const useAuth: UseAuth = () => use(Context)
