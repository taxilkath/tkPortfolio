import { expect, test } from '@playwright/test'

import { getNumberFlow } from '../utils/number-flow'

test.describe('like button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test-like')
  })

  test('should be able to like a post', async ({ page }) => {
    const likeCount = page.getByTestId('like-count')
    const likeButton = page.getByTestId('like-button')

    await expect(likeCount).toBeVisible({ timeout: 5000 })
    expect(await getNumberFlow(likeCount)).toBe('0')

    await likeButton.click()
    await expect(async () => {
      expect(await getNumberFlow(likeCount)).toBe('1')
    }).toPass({ timeout: 5000 })

    await likeButton.click()
    await likeButton.click()
    await expect(async () => {
      expect(await getNumberFlow(likeCount)).toBe('3')
    }).toPass({ timeout: 5000 })
  })
})
