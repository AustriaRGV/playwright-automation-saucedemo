  import { test, expect } from '@playwright/test';
  
  test('Adding items to the cart', async ({ page }) => {
    // Go to Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Wait for inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    //locate cart badge
    const cartBadge = page.locator('.shopping_cart_badge');    
    //Add one item to cart
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Verify cart badge shows 1 item
    await expect(cartBadge).toHaveText('1');

    //checkout item(s)
    await page.click('.shopping_cart_link');
    const checkoutButton = page.locator('[data-test="checkout"]');
    await expect(checkoutButton).toBeVisible();
    checkoutButton.click();

    // Verify we are on checkout page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
     await page.fill('#first-name', 'John');
    await page.fill('#last-name', 'Doe');
    await page.fill('#postal-code', '12345')
    await page.click('#continue');

    // Verify we are on checkout overview page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    const finishButton = page.locator('[data-test="finish"]');
    await expect(finishButton).toBeVisible();
    finishButton.click();

    // Verify we are on checkout complete page
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    const homeButton = page.locator('[data-test="back-to-products"]');
    await expect(homeButton).toBeVisible();
    await homeButton.click();
});