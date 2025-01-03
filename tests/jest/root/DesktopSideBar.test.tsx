import { act, render, screen } from '@testing-library/react'
import { describe, it } from '@jest/globals'
import DesktopSideBar from '@/components/root/SideBar/variants/DesktopSideBar'
import { wait } from '@testing-library/user-event/dist/utils'
import { mockAnimationsApi } from 'jsdom-testing-mocks'
import SideBarProps from '@/typings/root/SideBarProps'
import { SideBarConfigTest } from '@/tests/jest/root/SideBarConfig.test'

mockAnimationsApi()

describe('DesktopSideBar', () => {
  it('has the correct title', async () => {
    const Component = await DesktopSideBar({ ...SideBarConfigTest })
    render(Component)

    const sidebarHeading = screen.getByRole('heading', { level: 3 })

    expect(sidebarHeading).toBeInTheDocument()
    expect(sidebarHeading).toHaveTextContent(SideBarConfigTest.title)
  })

  it('shows navigation items and containers (=item with subitems)', async () => {
    const Component = await DesktopSideBar({ ...SideBarConfigTest })
    render(Component)

    const initialSidebarItems = screen.getAllByRole('listitem', {})
    await act(() => openSideBarElementDisclosures(initialSidebarItems))

    //* After opening all disclosures, all items should be visible
    const items = screen.getAllByRole('listitem', {})
    const itemTitles = items.map((item) => item.getElementsByClassName('element-title')[0].textContent)

    const expectedItems = SideBarConfigTest.items.reduce((acc, item) => (item.items ? acc.concat(item).concat(item.items) : acc.concat(item)), [])

    expect(items).toHaveLength(expectedItems.length)
    expect(itemTitles).toEqual(expectedItems.map((item) => item.title))
  })

  it('checks whether items without subitems and href are rendered as valid link', async () => {
    const config: SideBarProps = {
      title: 'Test',
      iconName: 'LifebuoyIcon',
      items: [
        {
          title: 'Test',
          iconName: 'LifebuoyIcon',
        },
      ],
    }
    const Component = await DesktopSideBar({ ...config })
    render(Component)

    const items = screen.getAllByRole('listitem', {})
    expect(items).toHaveLength(1)

    const annchorTags = items[0].getElementsByTagName('a')
    expect(annchorTags).toHaveLength(1)

    expect(annchorTags[0].textContent).toBe(config.items.at(0).title)
    expect(annchorTags[0]).toHaveAttribute('href', '#')
  })
})

/**
 * Opens all disclosures in the sidebar recursively.
 * @returns Promise<void> - opens all disclosures by using the act function
 * @param elements
 */
async function openSideBarElementDisclosures(elements: HTMLElement[]) {
  for (const element of elements) {
    //* Disclosure-Open button
    if (element.children[0].tagName === 'BUTTON') {
      const button = element.children[0] as HTMLButtonElement

      //? Open Disclosure-Panels (recursively due to the act function)
      button.click()
      await wait(500) // wait for animation to finish
    }
  }
}
