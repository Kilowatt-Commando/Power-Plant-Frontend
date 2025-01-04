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
    ([x, y]) => {
      const grid = document.querySelector('body > div:nth-of-type(3) > div.grid')!

      const children = Array.from(grid.children)
      const opacities = children.map((child) => window.getComputedStyle(child).opacity)

      console.log('Finished checking initial opacities')
      return opacities.some((opacity) => opacity !== '1')
    },
    [7, 8],
  )
  expect(areItemsHiddenInitially).toBe(true)

  await page.waitForFunction(
    async () => {
      const grid = document.querySelector('body > div:nth-of-type(3) > div.grid')
      console.log('Checking opacities...')
      if (!grid) return false

      return await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          const children = Array.from(grid.children)
          const opacities = children.map((child) => window.getComputedStyle(child).opacity).map((opacity) => Math.round(parseFloat(opacity)))

          if (opacities.every((opacity) => opacity === 1)) {
            console.log("Every child's opacity is 1")
            clearInterval(interval)
            resolve(true)
          } else {
            console.log(opacities)
          }
        }, 250)
      })
    },
    {},
    { timeout: 20000 }, // After 10 seconds, wait will time out
  )

  await page.pause()
})
