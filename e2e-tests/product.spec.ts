import { test, expect } from '@playwright/test'

test('Products page', async ({ page }) => {
	await page.goto('http://localhost:3000/products', { waitUntil: 'networkidle' })

	// Check if the page title is "Products"
	console.log(await page.title())
	await expect(page).toHaveTitle('Products')

	// Check if the page contains a button with text "Cart has 0 items"
	const cartButton = page.locator('button', { hasText: 'Cart has 0 items' })
	await expect(cartButton).toBeVisible()

	// Check if the page contains a button with text "Go to checkout"
	const checkoutButton = page.locator('button', { hasText: 'Go to checkout' })
	await expect(checkoutButton).toBeVisible()

	// Click the "Go to checkout" button
	await checkoutButton.click()

	// Check if the page navigates to the cart page
	await expect(page).toHaveURL(/.*\/cart\/.*/)
})
