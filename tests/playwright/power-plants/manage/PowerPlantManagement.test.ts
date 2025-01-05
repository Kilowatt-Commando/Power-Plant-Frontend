import { expect, test } from '@/tests/playwright/root/fixtures'

/**
 * Checks if a given table-element has action buttons in the last table-cell
 * @param page
 * @param elementSelector The selector of the table-element
 * @returns The number of action buttons in the last table-cell
 * @internal
 */
async function hasActionButtons(page: any, elementSelector: string): Promise<number> {
  return await page.evaluate(
    ({ elementSelector }) => {
      const element = document.querySelector(elementSelector)
      if (!element) return false

      const lastCell = element.querySelector('td:last-child')
      if (!lastCell) return false

      const buttons = Array.from(lastCell.querySelectorAll('button'))
      return buttons.length
    },
    { elementSelector },
  )
}

/**
 * Clicks an action button in the last table-cell of a given table-element
 * @param page
 * @param elementSelector The selector of the table-element
 * @param buttonText The text of the button to click, is not case-sensitive
 * @internal
 */
async function clickActionButton(page: any, elementSelector: string, buttonText: string): Promise<boolean> {
  return await page.evaluate(
    ({ elementSelector, buttonText }) => {
      const element = document.querySelector(elementSelector)
      if (!element) return false

      const lastCell = element.querySelector('td:last-child')
      if (!lastCell) return false

      const buttons = Array.from(lastCell.querySelectorAll('button'))
      const actionButton = buttons.find((button) => button.textContent?.toLowerCase().includes(buttonText.toLowerCase()))
      if (!actionButton) return false

      actionButton.click()
      return true
    },
    { elementSelector, buttonText },
  )
}

test('Power Plant Management Page - Animates PowerPlant Startup', async ({ page }) => {
  const TABLE_ELEMENT_SELECTOR = 'html > body > div:nth-of-type(3) > div > table > tbody > tr:nth-of-type(1)'

  await page.goto('http://localhost:3000/power-plants/manage')
  const element = page.locator(TABLE_ELEMENT_SELECTOR)
  expect(element).not.toBeNull()
  await expect(element).toBeVisible()

  const actionButons = await hasActionButtons(page, TABLE_ELEMENT_SELECTOR)
  expect(actionButons, 'Expect Management Table Element to have Action-Buttons in the last table-cell').toBeGreaterThanOrEqual(1)

  const startButtonClicked = await clickActionButton(page, TABLE_ELEMENT_SELECTOR, 'Start')
  expect(startButtonClicked, 'Expect Start-Button to be clicked').toBe(true)

  // Check if the element is animated
  await page.waitForFunction(
    ({ FIRST_TABLE_ELEMENT_SELECTOR }) => {
      const element = document.querySelector(FIRST_TABLE_ELEMENT_SELECTOR)
      if (!element) return false

      console.log('Waiting for element to be animated...')

      // Expect element to be animated => transform style to be not 'none'
      const transform = window.getComputedStyle(element).transform
      return transform !== 'none'
    },
    { FIRST_TABLE_ELEMENT_SELECTOR: TABLE_ELEMENT_SELECTOR },
    { polling: 250, timeout: 5000 },
  )
})
