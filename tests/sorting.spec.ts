import { test, expect } from '@playwright/test';

test('Sorting items by different categories', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Login with valid credentials
    let username = 'standard_user';
    let password = 'secret_sauce';
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();

    //dropdown locator
    const dropdown = page.locator('.product_sort_container');

    // Sort by Name (A to Z)
    await dropdown.selectOption('az');
    const firstItem = page.locator('.inventory_item_name').first();
    await expect(firstItem).toHaveText('Sauce Labs Backpack');

    const text = await firstItem.textContent();
    if (text === 'Sauce Labs Backpack') {
        console.log('Sorting by Name (A to Z) is working correctly.');
    } else {
        console.error('Sorting by Name (A to Z) is not working correctly.');
    }

    await dropdown.selectOption('za');
    const firstItemZA = page.locator('.inventory_item_name').first();
    await expect(firstItemZA).toHaveText('Test.allTheThings() T-Shirt (Red)');
    
    const textZA = await firstItemZA.textContent();
    if (textZA === 'Test.allTheThings() T-Shirt (Red)') {
        console.log('Sorting by Name (Z to A) is working correctly.');
    } else {
        console.error('Sorting by Name (Z to A) is not working correctly.');
    }

    await dropdown.selectOption('lohi');
    const firstItemLowHigh = page.locator('.inventory_item_name').first();
    await expect(firstItemLowHigh).toHaveText('Sauce Labs Onesie');

    const textLowHigh = await firstItemLowHigh.textContent();
    if (textLowHigh === 'Sauce Labs Onesie') {
        console.log('Sorting by Price (Low to High) is working correctly.');
    } else {
        console.error('Sorting by Price (Low to High) is not working correctly.');
    }
    
    await dropdown.selectOption('hilo');
    const firstItemHighLow = page.locator('.inventory_item_name').first();
    await expect(firstItemHighLow).toHaveText('Sauce Labs Fleece Jacket');

    const textHighLow = await firstItemHighLow.textContent();
    if (textHighLow === 'Sauce Labs Fleece Jacket') {
        console.log('Sorting by Price (High to Low) is working correctly.');
    } else {
        console.error('Sorting by Price (High to Low) is not working correctly.');
    }
});