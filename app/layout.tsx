import type { Metadata } from 'next'
import './globals.css'
import SideBar from '@/components/root/SideBar'
import { twMerge } from 'tailwind-merge'
import { MainContentShiftBreakpoints } from '@/config/SideBarConfig'
import React from 'react'
import AuthProvider from '@/components/root/AuthProvider'
import getColorMode from '@/lib/getColorMode'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import EnvironmentVariablesProvider from '@/components/power-plants/manage/EnvironmentVariablesProvider'

export const metadata: Metadata = {
  title: 'Power Plant Frontend',
  description: 'Visualize and Control Power Plants',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const colorMode = getColorMode()

  return (
    <html lang='en' className={twMerge('', colorMode)}>
      <body className={`bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200`}>
        <SideBar />
        <AuthProvider>
          <EnvironmentVariablesProvider DATA_API={process.env.DATA_API!} CONTROL_API={process.env.CONTROL_API!}>
            <div className={twMerge('p-4 @container', MainContentShiftBreakpoints)}>{children}</div>
          </EnvironmentVariablesProvider>
        </AuthProvider>
        <ToastContainer position='top-right' autoClose={3000} stacked pauseOnFocusLoss={false} />
      </body>
    </html>
  )
}
