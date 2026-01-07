import { test, expect } from '@playwright/test';

test.describe('Test radio buttons @p2', () => {
    test('Select first value of radio button @p21', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        // await page.getByRole('radio', { name: /Radio1/i }).check();
        await page.locator('input[value="radio1"][class="radioButton"]').check();

        await expect(page.locator('input[class="radioButton"][value="radio1"]')).toBeChecked()


    });

    test('Select second value of radio button @p22', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        // await page.getByRole('radio', { name: /Radio1/i }).check();
        await page.locator('input[value="radio2"][class="radioButton"]').check();

        await expect(page.locator('input[class="radioButton"][value="radio2"]')).toBeChecked()


    });

    test('Select third value of radio button @p23', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/')

        await page.locator('input[value="radio3"][class="radioButton"]').check();

        await expect(page.locator('input[class="radioButton"][value="radio3"]')).toBeChecked()


    });
});