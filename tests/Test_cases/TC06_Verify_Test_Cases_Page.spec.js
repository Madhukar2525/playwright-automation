import { test, expect } from '@playwright/test';

test('TC06: Verify Test Cases Page @tc6 @regression', async({page}) => {
    await page.goto("https://automationexercise.com");
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    // await page.locator('text=Test Cases').click();
    // await page.locator('text=Test Cases : a[href="/test_cases"]').click()
    await page.getByRole('link', { name: 'Test Cases', exact: true }).click()
    // await page.locator('a:has-text("Test Cases")[href="/test_cases"]').click();
    await expect(page).toHaveURL("https://automationexercise.com/test_cases");
});