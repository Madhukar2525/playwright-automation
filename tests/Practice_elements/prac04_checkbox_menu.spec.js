import { test, expect } from '@playwright/test';

test.describe('Test checkbox @p4', () => {
    test('Select first value of checkbox @p41', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

        // await page.getByRole('checkbox', {name: /Option1/}).check();
        await page.locator('input[id="checkBoxOption1"][value="option1"]').check()
        await expect(page.locator('input[id="checkBoxOption1"][value="option1"]')).toBeChecked()
        
    });

    test('Select second value of checkbox @p42', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

        

        
    });

    test('Select third value of checkbox @p43', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    });
});