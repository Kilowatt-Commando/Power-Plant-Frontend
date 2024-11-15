import { act, render, screen } from '@testing-library/react'
import { describe, it } from '@jest/globals'
import { SideBarConfiguration } from '@/config/SideBarConfig'
import DesktopSideBar from '@/components/root/SideBar/variants/DesktopSideBar'
import { wait } from '@testing-library/user-event/dist/utils'
import { mockAnimationsApi } from 'jsdom-testing-mocks'

mockAnimationsApi()

describe('DesktopSideBar', () => {
  it('has the correct title', async () => {
    const Component = await DesktopSideBar({ ...SideBarConfiguration })
    render(Component)

    const sidebarHeading = screen.getByRole('heading', { level: 3 })

    expect(sidebarHeading).toBeInTheDocument()
    expect(sidebarHeading).toHaveTextContent(SideBarConfiguration.title)
  })

  it('shows navigation items and containers (=item with subitems)', async () => {
    const Component = await DesktopSideBar({ ...SideBarConfiguration })
    render(Component)

    const initialSidebarItems = screen.getAllByRole('listitem', {})
    await act(() => openSideBarElementDisclosures(initialSidebarItems))

    //* After opening all disclosures, all items should be visible
    const items = screen.getAllByRole('listitem', {})
    const itemTitles = items.map((item) => item.getElementsByClassName('element-title')[0].textContent)

    const expectedItems = SideBarConfiguration.items.reduce((acc, item) => (item.items ? acc.concat(item).concat(item.items) : acc.concat(item)), [])

    expect(items).toHaveLength(expectedItems.length)
    expect(itemTitles).toEqual(expectedItems.map((item) => item.title))
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
