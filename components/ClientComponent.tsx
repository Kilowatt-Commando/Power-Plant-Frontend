'use client'

import { useState } from 'react'

export default function ClientComponent() {
  const [mode, setMode] = useState(false)

  return <h1>This is a client component...</h1>
}
