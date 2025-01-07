import React, { Suspense } from 'react'
import { twMerge } from 'tailwind-merge'
import { MobileSideBarVisibilityBreakpoints } from '@/config/SideBarConfig'
import { BoltIcon } from '@heroicons/react/24/outline'
import SideBarProps from '@/typings/root/SideBarProps'
import { RenderSideBarItems } from '@/components/root/SideBar'
import { LoadingProfileInformation } from '@/components/root/UserProfile/LoadingUserInformation'
import UserProfile from '@/components/root/UserProfile/UserProfie'
import ColorModeSwitcher from '@/components/root/ColorModeSwitcher'
import MobileSideBarContextProvider from '@/components/root/SideBar/variants/MobileSideBarContext'
import OpenCloseButton from '@/components/root/SideBar/variants/MobileSideBar_OpenCloseButton'
import MobileSideBarDialog from '@/components/root/SideBar/variants/MobileSideBarDialog'
import getColorMode from '@/lib/getColorMode'

export default function MobileSideBar(props: SideBarProps) {
  const colorMode = getColorMode()

  return (
    <MobileSideBarContextProvider>
      <div id='mobile-sidebar-top-bar' className={twMerge('bg-gray-50 dark:bg-neutral-900 p-4 border-b-2 justify-between', MobileSideBarVisibilityBreakpoints)}>
        <OpenCloseButton />
        <h3 className='flex-1 text-center text-lg font-semibold leading-6 text-gray-700 dark:text-gray-200'>{props.title}</h3>
        <ColorModeSwitcher defaultValue={colorMode} />
      </div>

      <MobileSideBarDialog>
        <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-white pb-2 dark:bg-neutral-800 '>
          <div className='flex shrink-0 items-center justify-between border-b-2 pl-4 py-4 border-solid px-2 border-gray-400 dark:border-gray-200 dark:bg-neutral-900'>
            <BoltIcon className='size-6' />
            <span className='text-lg flex-1 mx-auto pr-4 text-center font-semibold leading-6 text-gray-700 dark:text-gray-200'>Navigation</span>
            <OpenCloseButton />
          </div>

          <div className='h-full dark:text-gray-300/90 text-gray-600 pr-4 pl-2'>
            <RenderSideBarItems items={props.items} />
          </div>

          <Suspense fallback={LoadingProfileInformation()}>
            <UserProfile profilePage='/profile' />
          </Suspense>
        </div>
      </MobileSideBarDialog>
    </MobileSideBarContextProvider>
  )
}
