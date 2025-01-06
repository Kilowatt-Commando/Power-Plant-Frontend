'use client'

import React, { Fragment } from 'react'
import { useMobileSideBarContext } from '@/components/root/SideBar/variants/MobileSideBarContext'
import { Dialog, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { MobileSideBarVisibilityBreakpoints } from '@/config/SideBarConfig'

/**
 * Renders the dialog that slides in from the left and displays renders the provided children in it
 * @param children The content / children that are rendered in the dialog
 */
export default function MobileSideBarDialog({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useMobileSideBarContext()

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className={twMerge('relative z-50', MobileSideBarVisibilityBreakpoints)} onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter='transition-opacity ease-linear duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity ease-linear duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-neutral-900/80' />
        </Transition.Child>

        <div className='fixed inset-0 flex'>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'>
            <Dialog.Panel className='relative flex w-full max-w-xs flex-1 sm:max-w-sm'>{children}</Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
