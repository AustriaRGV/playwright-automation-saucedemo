import { test, expect } from '@playwright/test';

test('Adding items to the cart - standard_user', async ({ page }) => {
  // Go to Sauce Demo
  await page.goto('https://www.saucedemo.com/');
  
  // Login
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Wait for inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Get all "Add to cart" buttons
  const buttons = page.locator('[data-test^="add-to-cart"]');

  while (await buttons.count() > 0) {
    await buttons.first().click();    
  }
  // Verify cart badge
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('6');

  // Open cart
  await page.click('.shopping_cart_link');

  // Verify at least one item is visible in cart
  const cartItems = page.locator('.cart_item');
  await expect(cartItems).toHaveCount(6);

  //remove items from cart
  const removeButtons = page.locator('[data-test^="remove"]');
  while (await removeButtons.count() > 0) {
    await removeButtons.first().click();    
  }
  // Verify cart is empty
  const cart = page.locator('.shopping_cart_badge');
  await expect(cart).toHaveCount(0);

  //Continue shopping
  await page.click('#continue-shopping');
  // Verify we are back on inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});