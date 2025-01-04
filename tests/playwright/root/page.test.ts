import { expect, test } from './fixtures'

test('Root Page has heading', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const heading = page.locator('html > body > div:nth-of-type(3) > h1')

  await expect(heading).toBeVisible()
})

test('Root Page shows animation', async ({ page }) => {
  const ANIMATION_GRID_SELECTOR = 'body > div:nth-of-type(3) > div.grid'

  await page.goto('http://localhost:3000/')
  const animatedGrid = page.locator(ANIMATION_GRID_SELECTOR)
  expect(animatedGrid).not.toBeNull()
  await expect(animatedGrid).toBeVisible()

  // Check that not all children are visible
  const areItemsHiddenInitially = await page.evaluate(
    ({ ANIMATION_GRID_SELECTOR }) => {
      const grid = document.querySelector(ANIMATION_GRID_SELECTOR)
      if (!grid) return false

      const children = Array.from(grid.children)
      const opacities = children.map((child) => window.getComputedStyle(child).opacity)

      console.log('Finished checking initial opacities')
      return opacities.some((opacity) => opacity !== '1')
    },
    { ANIMATION_GRID_SELECTOR },
  )
  expect(areItemsHiddenInitially).toBe(true)

  await page.waitForFunction(
    ({ ANIMATION_GRID_SELECTOR }) => {
      const grid = document.querySelector(ANIMATION_GRID_SELECTOR)
      if (!grid) return false

      const children = Array.from(grid.children)
      const opacities = children.map((child) => window.getComputedStyle(child).opacity)

      return opacities.every((opacity) => opacity === '1')
    },
    { ANIMATION_GRID_SELECTOR },
    { polling: 250, timeout: 10000 }, // Checl every 250ms, timeout after 10 seconds
  )
})
