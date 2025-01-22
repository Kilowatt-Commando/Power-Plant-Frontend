// 'use client'

// import { SessionProvider } from 'next-auth/react'

// export default function AuthProvider({ children }: { children: React.ReactNode }) {
//   return <SessionProvider>{children}</SessionProvider>
// }

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  // Load token from localStorage on first render
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      setIsAuthenticated(true)
    }
  }, [])

  const login = (jwtToken: string) => {
    setIsAuthenticated(true)
    setToken(jwtToken)
    localStorage.setItem('token', jwtToken)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setToken(null)
    localStorage.removeItem('token')
  }

  return <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
