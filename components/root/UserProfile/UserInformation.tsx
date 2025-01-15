import { GitHubUser } from '@/lib/getSession'
import Link from 'next/link'
import Image from 'next/image'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

/**
 * This component is displayed when the user is logged in and renders a banner that displays the user's name and profile picture.
 */
export function UserInformation({ user, profilePage }: { user: GitHubUser; profilePage: string }) {
  return (
    <Link
      href={profilePage}
      className='mx-2 text-sm px-2 group flex flex-1 items-center gap-x-4 rounded-md py-3 font-semibold leading-6 text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/40'>
      <Image src={user.image} width={256} height={256} alt={user.name + 'icon'} className='size-6 rounded-full' />
      <span className='flex-1 group-hover:font-bold group-hover:text-indigo-600 dark:group-hover:text-blue-400'>{user.name}</span>
      <Cog6ToothIcon className='size-6 group-hover:stroke-2 dark:group-hover:stroke-blue-400 group-hover:stroke-indigo-600' />
    </Link>
  )
}
