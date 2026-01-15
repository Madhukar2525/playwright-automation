import { test, expect } from '@playwright/test';

test('TC04: Register User with existing email @tc4 @regression', async({page}) => {
    const firstName = "Steve";
    const lastName = "Irwin";
    const email = firstName + "." + lastName + "@gmail.com";
    const fullName = firstName + " " + lastName;

    await page.goto("https://automationexercise.com", { waitUntil: 'domcontentloaded'});
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    await page.locator('text=Signup / Login').click();
    await expect(page).toHaveURL("https://automationexercise.com/login");
    await expect(page).toHaveTitle("Automation Exercise - Signup / Login");

    await expect(page.locator('text=New User Signup!')).toBeVisible()

    await page.locator('[data-qa="signup-name"]').fill(fullName);

    await page.locator('[data-qa="signup-email"]').fill(email);

    await page.locator('[data-qa="signup-button"]').click();
    await expect(page.locator('text=Email Address already exist!')).toBeVisible()
})