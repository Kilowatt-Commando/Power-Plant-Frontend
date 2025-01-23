'use client'

import { createContext, useContext } from 'react'

interface EnvironmentVariablesProps {
  DATA_API: string
  CONTROL_API: string
}

const Context = createContext<EnvironmentVariablesProps>({} as any)

export default function EnvironmentVariablesProvider({ children, ...props }: { children: React.ReactNode } & EnvironmentVariablesProps) {
  return <Context.Provider value={props}>{children}</Context.Provider>
}

export function useEnvironmentVariables() {
  const props = useContext(Context)

  if (!props) {
    throw new Error('useEnvironmentVariables must be used within a EnvironmentVariablesProvider')
  }

  return props
}
