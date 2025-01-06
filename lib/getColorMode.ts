import { cookies as nextCookies } from 'next/dist/client/components/headers'

export default function getColorMode(): 'light' | 'dark' | undefined {
  const cookies = nextCookies()
  const colorMode = cookies.get('colorMode' as never)?.value

  if (!colorMode) return undefined

  return colorMode === 'light' ? 'light' : 'dark'
}
