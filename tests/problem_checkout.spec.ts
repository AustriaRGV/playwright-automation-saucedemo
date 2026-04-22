import { test, expect } from '@playwright/test';
  
  test('Adding items to the cart - standard_user', async ({ page }) => {
    // Go to Sauce Demo
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.fill('#user-name', 'problem_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory.html/);

    
});