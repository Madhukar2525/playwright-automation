import { test, expect } from '@playwright/test';

test.describe('Test drop down menu @p3', () => {
    test('Select first value of dropdown @p31', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        await page.locator('[id="dropdown-class-example"]').selectOption('Option1');
        await expect(page.locator('[id="dropdown-class-example"] option:checked')).toHaveText('Option1')


    });

    test('Select second value of dropdown @p32', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        await page.locator('[id="dropdown-class-example"]').selectOption('Option2');
        await expect(page.locator('[id="dropdown-class-example"] option:checked')).toHaveText('Option2')


    });

    test('Select third value of dropdown @p33', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        await page.locator('[id="dropdown-class-example"]').selectOption('Option3');
        await expect(page.locator('[id="dropdown-class-example"] option:checked')).toHaveText('Option3')
    });
});