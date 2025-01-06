'use client'

import { useEffect, useState } from 'react'
import { parseCookies, setCookie } from 'nookies'
import { MoonIcon } from '@heroicons/react/24/outline'
import { Transition } from '@headlessui/react'
import useHeroIcon from '@/hooks/useHeroIcon'
import { twMerge } from 'tailwind-merge'

type ColorMode = 'light' | 'dark' | undefined

export default function ColorModeSwitcher({ defaultValue }: { defaultValue: ColorMode } = { defaultValue: undefined }) {
  const { mode, toggleMode } = ColorModeHandler(defaultValue)
  const Icon = useHeroIcon({ iconName: mode === 'light' ? 'SunIcon' : 'MoonIcon', type: 'solid' })

  return (
    <div className='hover:cursor-pointer' onClick={toggleMode}>
      <Transition show={mode === 'light'} enter='transition duration-300' enterFrom='rotate-45 opacity-50' enterTo='rotate-0 opacity-100' leave='hidden'>
        <Icon className={twMerge('size-6', mode === 'dark' && 'hidden')} />
      </Transition>

      <Transition show={mode === 'dark'} enter='transition duration-300' enterFrom='-rotate-45 opacity-50' enterTo='rotate-0 opacity-100' leave='hidden'>
        <Icon className={twMerge('size-6', mode === 'light' && 'hidden')} />
      </Transition>
    </div>
  )
}

function ColorModeHandler(defaultValue: ColorMode) {
  const [mode, setMode] = useState<ColorMode>(defaultValue)
  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light')

  useEffect(() => {
    if (!mode) return

    document.documentElement.classList.toggle('dark', mode === 'dark')
    setCookie(null, 'colorMode', mode, {
      maxAge: 24 * 60 * 60 * 300, // 300 days
      path: '/',
      secure: false,
      sameSite: true,
    })
  }, [mode])

  useEffect(() => {
    const userPreference: NonNullable<ColorMode> = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    const cookies = parseCookies()
    const colorMode = cookies.colorMode

    //? Sets color-mode based on user's preference when no cookie is set
    if (!colorMode) {
      document.documentElement.classList.toggle('dark', userPreference === 'dark')
      setMode(userPreference)
      return
    }

    setMode(colorMode === 'light' ? 'light' : 'dark')
  }, [])

  return { mode, toggleMode }
}
