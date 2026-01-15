import { test, expect } from '@playwright/test';

test('TC02: Login User with correct email and password @tc2 @smoke @regression', async ({ page }) => {
    const firstName = "Steve";
    const lastName = "Irwin";
    const email = firstName + "." + lastName + "@gmail.com";
    const fullName = firstName + " " + lastName;
    const password = firstName + "@123"

    await page.goto("https://automationexercise.com", { waitUntil: 'domcontentloaded'});
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    await page.locator('text=Signup / Login').click();
    await expect(page).toHaveURL("https://automationexercise.com/login");
    await expect(page).toHaveTitle("Automation Exercise - Signup / Login");

    await page.locator('[data-qa="login-email"]').fill(email);

    await page.locator('[data-qa="login-password"]').fill(password);

    await page.locator('[data-qa="login-button"]').click();
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");
    await expect(page.locator(`text=Logged in as ${fullName}`)).toBeVisible();

    await page.locator('text=Logout').click();
    await expect(page).toHaveURL("https://automationexercise.com/login");
    await expect(page).toHaveTitle("Automation Exercise - Signup / Login");

    
})