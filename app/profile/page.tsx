import React from 'react'
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import { ProfileSignOutView } from '@/components/profile/ProfileSignOutView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile Overview',
  description: 'Profile Overview of the user currently signed in',
}

export default async function ProfilePage() {
  const { user } = await getSession()

  if (!user) {
    redirect('/api/auth/signin')
  }

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Profile</h1>
      <ProfileSignOutView user={user} className='mt-[15dvh]' />
    </div>
  )
}
