import SideBarProps from '@/typings/root/SideBarProps'

export const SideBarConfigTest: SideBarProps = {
  title: 'Test',
  iconName: 'LifebuoyIcon',
  items: [
    {
      title: 'Item',
      iconName: 'LifebuoyIcon',
      items: [
        {
          title: 'SubItem1',
          iconName: 'LifebuoyIcon',
          href: '/subitem1',
        },
        {
          title: 'SubItem2',
          iconName: 'LifebuoyIcon',
          href: '/subitem2',
        },
        {
          title: 'SubItem3',
          iconName: 'LifebuoyIcon',
          href: '/subitem3',
        },
        {
          title: 'SubItem4',
          iconName: 'LifebuoyIcon',
          href: '/subitem4',
        },
      ],
    },
    {
      title: 'Item2',
      iconName: 'LifebuoyIcon',
      href: '/item2',
    },
  ],
}
