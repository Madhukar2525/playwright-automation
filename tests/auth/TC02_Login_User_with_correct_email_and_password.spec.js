import { test, expect } from '@playwright/test';

test('TC02: Login User with correct email and password @tc2 @smoke @regression', async({page}) => {
    const email = "john.cena@gmail.com";
    const password = "John@123";
    const name = "John Cena";

    await page.goto("https://automationexercise.com");
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    await page.locator('text=Signup / Login').click();
    await expect(page).toHaveURL("https://automationexercise.com/login");
    await expect(page).toHaveTitle("Automation Exercise - Signup / Login");

    await page.locator('[data-qa="login-email"]').click();
    await page.locator('[data-qa="login-email"]').fill(email);

    await page.locator('[data-qa="login-password"]').click();
    await page.locator('[data-qa="login-password"]').fill(password);

    await page.locator('[data-qa="login-button"]').click();
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");
    await expect(page.locator(`text=Logged in as ${name}`)).toBeVisible();
    
})