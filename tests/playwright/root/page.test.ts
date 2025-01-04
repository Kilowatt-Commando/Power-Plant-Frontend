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
      const grid = document.querySelector(ANIMATION_GRID_SELECTOR)!

      const children = Array.from(grid.children)
      const opacities = children.map((child) => window.getComputedStyle(child).opacity)

      console.log('Finished checking initial opacities')
      return opacities.some((opacity) => opacity !== '1')
    },
    { ANIMATION_GRID_SELECTOR },
  )
  expect(areItemsHiddenInitially).toBe(true)

  await page.waitForFunction(
    async ({ ANIMATION_GRID_SELECTOR }) => {
      const grid = document.querySelector(ANIMATION_GRID_SELECTOR)!
      console.log('Checking opacities...')

      return await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          const children = Array.from(grid.children)
          const opacities = children.map((child) => window.getComputedStyle(child).opacity).map((opacity) => parseFloat(opacity))

          if (opacities.every((opacity) => opacity === 1)) {
            console.log("Every child's opacity is 1")
            clearInterval(interval)
            resolve(true)
          }
        }, 250)
      })
    },
    { ANIMATION_GRID_SELECTOR },
    { timeout: 10000 }, // After 10 seconds, wait will time out
  )
})
