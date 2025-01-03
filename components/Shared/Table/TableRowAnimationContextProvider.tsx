'use client'

import { useAnimate } from 'framer-motion'
import { createContext, useContext } from 'react'

interface AnimationContextProps {
  animate: ReturnType<typeof useAnimate>[1]
  scope: ReturnType<typeof useAnimate>[0]
}
const Context = createContext<AnimationContextProps>({} as AnimationContextProps)

export const useTableRowAnimationContext = () => {
  const context = useContext(Context)

  if (!context) {
    throw new Error('useTableRowAnimationContext must be used within TableRowAnimationContextProvider')
  }

  return context
}

/**
 * This context provides the scope and animate function to its children
 * @param className - The classname for the tr-tag that wraps the children of this component
 */
export default function TableRowAnimationContextProvider({ className, children }: { className?: string; children: React.ReactNode }) {
  const [scope, animate] = useAnimate()

  return (
    <Context.Provider value={{ scope, animate }}>
      <tr ref={scope} className={className}>
        {children}
      </tr>
    </Context.Provider>
  )
}
