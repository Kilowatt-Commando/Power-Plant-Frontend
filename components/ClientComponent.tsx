'use client'

import { useState } from 'react'
import { renderHook } from '@testing-library/react'

export default function ClientComponent() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const state = renderHook(() => useState(false))
  const [isOpen, setIsOpen] = state.result.current

  return <h1>This is a client component...</h1>
}
