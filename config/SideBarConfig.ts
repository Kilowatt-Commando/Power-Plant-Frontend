import SideBarProps from '@/typings/root/SideBarProps'

export const SideBarConfiguration: SideBarProps = {
  title: 'Power Plant Operations',
  iconName: 'PowerIcon',
  items: [
    {
      title: 'Home',
      href: '/',
      iconName: 'HomeIcon',
    },
    {
      title: 'Available Plants',
      href: '/power-plants',
      iconName: 'ListBulletIcon',
    },
    {
      title: 'Manage Plants',
      href: '/power-plants/manage',
      iconName: 'WrenchScrewdriverIcon',
    },
    {
      title: 'Login',
      href: '/login',
      iconName: 'UserIcon',
    },
  ],
}

export const DesktopSideBarVisibilityBreakpoints = 'hidden md:flex w-[300px]'

export const MobileSideBarVisibilityBreakpoints = 'flex md:hidden'

export const MainContentShiftBreakpoints = 'md:ml-[300px]'
