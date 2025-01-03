import { GitHubUser } from '@/lib/getSession'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import Image from 'next/image'

/**
 * This component renders a user's profile picture, name, and a button to log out.
 */
export function ProfileSignOutView({ user, className }: { user: GitHubUser; className?: string }) {
  return (
    <div className={twMerge('flex flex-col gap-4 justify-center items-center', className)}>
      <Image className='rounded-full ' src={user.image} alt='user-icon' width={256} height={256} />
      <span className='font-semibold text-lg '>{user.name}</span>
      <Link href='/api/auth/signout' className='mt-4 px-4 py-2 rounded-md dark:bg-blue-500 ' type='button'>
        Log Out
      </Link>
    </div>
  )
}
