import React from 'react'
import { Metadata } from 'next'
import ProfileManagement from '@/components/root/UserProfile/ProfileManagement'

export const metadata: Metadata = {
  title: 'Profile Overview',
  description: 'Profile Overview of the user currently signed in',
}

export default async function UserProfilePage() {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-8 mt-2 tracking-wide'>Profile Management</h1>
      <ProfileManagement />
    </div>
  )
}
