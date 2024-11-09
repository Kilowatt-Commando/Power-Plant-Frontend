import type { Metadata } from 'next'
import './globals.css'
import SideBar from '@/components/root/SideBar'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-200`}>
        <SideBar />
        {children}
      </body>
    </html>
  )
}
