'use client'
import { createContext, useContext, useState } from 'react'

interface MobileSideBarContextProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const MobileSideBarContext = createContext<MobileSideBarContextProps>({} as MobileSideBarContextProps)

export function useMobileSideBarContext() {
  const context = useContext(MobileSideBarContext)

  if (!context) {
    throw new Error('useMobileSideBarContext must be used within a MobileSideBarContextProvider')
  }

  return context
}

export default function MobileSideBarContextProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return <MobileSideBarContext.Provider value={{ isOpen, setIsOpen }}>{children}</MobileSideBarContext.Provider>
}
