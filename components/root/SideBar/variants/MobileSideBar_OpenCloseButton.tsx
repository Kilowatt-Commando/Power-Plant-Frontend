'use client'
import { useMobileSideBarContext } from '@/components/root/SideBar/variants/MobileSideBarContext'
import useHeroIcon from '@/hooks/useHeroIcon'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * This component renders a button that opens or closes the mobile sidebar depending on its open-state.
 */
export default function MobileSideBar_OpenCloseButton() {
  const { isOpen, setIsOpen } = useMobileSideBarContext()
  const pathname = usePathname()
  const [cachedPathname, setCachedPathname] = useState(pathname)
  const screenReaderText = isOpen ? 'Close sidebar' : 'Open sidebar'
  const ButtonIcon = useHeroIcon({ iconName: isOpen ? 'XMarkIcon' : 'Bars3Icon' })

  //? Auto-Close Navigation Bar when route-changes => navigation-item was clicked
  useEffect(() => {
    if (cachedPathname === pathname) return
    if (!isOpen) return

    setIsOpen(false)
    setCachedPathname(pathname)
  }, [pathname])

  return (
    <button name='open-close-button' type='button' className=' text-gray-700 dark:text-gray-200' onClick={() => setIsOpen(!isOpen)}>
      <span className='sr-only'>{screenReaderText}</span>

      <ButtonIcon className='size-6' />
    </button>
  )
}
