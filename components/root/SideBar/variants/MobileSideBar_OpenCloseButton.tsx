import { useMobileSideBarContext } from '@/components/root/SideBar/variants/MobileSideBarContext'
import useHeroIcon from '@/hooks/useHeroIcon'

/**
 * This component renders a button that opens or closes the mobile sidebar depending on its open-state.
 */
export default function MobileSideBar_OpenCloseButton() {
  const { isOpen, setIsOpen } = useMobileSideBarContext()
  const screenReaderText = isOpen ? 'Close sidebar' : 'Open sidebar'
  const ButtonIcon = useHeroIcon({ iconName: isOpen ? 'XMarkIcon' : 'Bars3Icon' })

  return (
    <button name='open-close-button' type='button' className='-m-2.5 p-2.5 text-gray-700 dark:text-gray-200' onClick={() => setIsOpen(!isOpen)}>
      <span className='sr-only'>{screenReaderText}</span>

      <ButtonIcon className='size-6' />
    </button>
  )
}
