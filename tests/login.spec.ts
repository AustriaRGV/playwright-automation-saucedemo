import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
await page.goto('https://www.saucedemo.com/');

// Expect a title "to contain" a substring.
await expect(page).toHaveTitle(/Swag Labs/);
});
const user_ids = [
  {user: '', pass:'', expectedError: 'Username is required'},
  {user: 'standard_user', pass: 'secret_sauce', expectedError: null},
  {user: 'locked_out_user', pass: 'secret_sauce', expectedError: 'Sorry, this user has been locked out.'},
  {user: 'problem_user', pass: 'secret_sauce', expectedError: null},
  {user: 'performance_glitch_user', pass: 'secret_sauce', expectedError: null},
  {user: 'error_user', pass: 'secret_sauce', expectedError: null},
  {user: 'visual_user', pass: 'secret_sauce', expectedError: null}
];

for (const user_id of user_ids) {
  test(`Sauce Demo Login Validation - ${user_id.user || 'empty_user'}`, async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').waitFor({ state: 'visible' });

  await page.locator('#user-name').fill(user_id.user);
  await page.locator('#password').fill(user_id.pass);
  await page.click('#login-button');

  if (user_id.expectedError) {
    const error = page.locator('[data-test="error"]');
     await expect(error).toBeVisible({ timeout: 5000 });
  }
  else {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      // Reset by logging out for the next loop iteration
      await page.getByRole('button', { name: 'Open Menu' }).click();
      await page.getByRole('link', { name: 'Logout' }).click();
  }
});
}