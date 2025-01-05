import { expect, test } from '@/tests/playwright/root/fixtures'

test('Power Plant Management Page - Animates PowerPlant Startup', async ({ page }) => {
  const TABLE_ELEMENT_SELECTOR = 'html > body > div:nth-of-type(3) > div > table > tbody > tr:nth-of-type(1)'

  await page.goto('http://localhost:3000/power-plants/manage')
  const element = page.locator(TABLE_ELEMENT_SELECTOR)
  expect(element).not.toBeNull()
  await expect(element).toBeVisible()

  const hasActionButtons = await page.evaluate(
    ({ FIRST_TABLE_ELEMENT_SELECTOR }) => {
      const element = document.querySelector(FIRST_TABLE_ELEMENT_SELECTOR)
      if (!element) return false

      const lastCell = element.querySelector('td:last-child')
      if (!lastCell) return false

      const buttons = Array.from(lastCell.querySelectorAll('button'))
      return buttons.length > 0
    },
    { FIRST_TABLE_ELEMENT_SELECTOR: TABLE_ELEMENT_SELECTOR },
  )

  expect(hasActionButtons, 'Expect Management Table Element to have Action-Buttons in the last table-cell').toBe(true)

  const startButtonClicked = await page.evaluate(
    ({ FIRST_TABLE_ELEMENT_SELECTOR }) => {
      const element = document.querySelector(FIRST_TABLE_ELEMENT_SELECTOR)
      if (!element) return false

      const lastCell = element.querySelector('td:last-child')
      if (!lastCell) return false

      const buttons = Array.from(lastCell.querySelectorAll('button'))
      const startButton = buttons.find((button) => button.textContent?.toLowerCase().includes('start'))
      if (!startButton) return false

      startButton.click()
      return true
    },
    { FIRST_TABLE_ELEMENT_SELECTOR: TABLE_ELEMENT_SELECTOR },
  )

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
