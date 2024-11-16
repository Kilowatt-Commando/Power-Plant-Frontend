'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return <h1>This is a client component...</h1>
}
