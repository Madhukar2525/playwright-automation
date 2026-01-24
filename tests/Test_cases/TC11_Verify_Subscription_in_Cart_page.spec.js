import { test, expect } from '@playwright/test';

test('TC11: Verify Subscription in Cart page @tc11 @regression', async ({ page }) => {
    await page.goto("https://automationexercise.com", { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    await page.getByRole('link', { name: " Cart"}).click();

    await page.locator('[id="footer"]').scrollIntoViewIfNeeded();

    await expect(page.locator('h2', { hasText: "Subscription"})).toBeVisible();

    const email = "user@gmail.com"
    await page.locator('[id="susbscribe_email"]').fill(email);
    await page.locator('[id="subscribe"]').click();
    await expect(page.locator('.alert-success')).toHaveText(/You have been successfully subscribed!/i);
})