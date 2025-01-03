import SideBarProps from '@/typings/root/SideBarProps'
import { twMerge } from 'tailwind-merge'
import { DesktopSideBarVisibilityBreakpoints } from '@/config/SideBarConfig'
import React, { Suspense } from 'react'
import { RenderSideBarItems } from '@/components/root/SideBar'
import { LoadingProfileInformation } from '@/components/root/UserProfile/LoadingUserInformation'
import UserProfile from '@/components/root/UserProfile/UserProfie'
import ColorModeSwitcher from '@/components/root/ColorModeSwitcher'

export default function DesktopSideBar(props: SideBarProps) {
  return (
    <div id='desktop-sidebar-container' className={twMerge('fixed dark:bg-neutral-900/50 bg-gray-200 h-full flex-col p-3 pl-2', DesktopSideBarVisibilityBreakpoints)}>
      <div id={'sidebar-header'} className='flex gap-4 items-center justify-center pb-3 border-b-2 dark:border-neutral-300 border-gray-600'>
        <h3 className='text-xl dark:text-gray-300 text-gray-700'>{props.title}</h3>
        <ColorModeSwitcher />
      </div>

      <div className='h-full dark:text-gray-300/90 text-gray-600 py-4'>
        <RenderSideBarItems items={props.items} />
      </div>

      <Suspense fallback={LoadingProfileInformation()}>
        <UserProfile profilePage='/profile' />
      </Suspense>
    </div>
  )
}
