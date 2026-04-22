import { test, expect } from '@playwright/test';

test('Adding items to the cart - problem_user', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');

  // Login
  await page.fill('#user-name', 'problem_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await expect(page).toHaveURL(/inventory.html/);

  // Add items
  const buttons = page.locator('[data-test^="add-to-cart"]');
  const count = await buttons.count();

  for (let i = 0; i < count; i++) {
    try {
      const btn = page.locator('[data-test^="add-to-cart"]').first();

      // Wait until clickable (with timeout)
      await btn.waitFor({ state: 'visible', timeout: 2000 });

      await btn.click({ timeout: 2000 });

    } catch (error) {
      console.error(`Button unresponsive at index ${i}`);
      break; // stop loop if button fails
    }
  }

  // Cart badge
  const cartBadge = page.locator('.shopping_cart_badge');

  try {
    await expect(cartBadge).toBeVisible({ timeout: 3000 });
  } catch {
    console.error('Cart badge did not appear (items may not have been added)');
  }

  const badgeText = await cartBadge.textContent();
  const addedItems = Number(badgeText);

  expect(addedItems).toBeGreaterThan(0);
  expect(addedItems).toBeLessThanOrEqual(count);

  // Open cart
  await page.click('.shopping_cart_link');

  const cartItems = page.locator('.cart_item');
  await expect(cartItems.count()).resolves.toBeGreaterThan(0);

  // Remove items
  const removeButtons = page.locator('[data-test^="remove"]');

  while (await removeButtons.count() > 0) {
    try {
      await removeButtons.first().click({ timeout: 2000 });
    } catch {
      console.error('Remove button not responding');
      break;
    }
  }

  await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

  await page.click('#continue-shopping');
  await expect(page).toHaveURL(/inventory.html/);
});