import { expect, test } from './fixtures'

test('Root Page has heading', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const heading = page.locator('html > body > div:nth-of-type(3) > h1')

  await expect(heading).toBeVisible()
})
