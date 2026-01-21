import { test, expect } from '@playwright/test';

test.describe("TC03: Login User with incorrect credentials @regression", () => {
    test('Login User with incorrect email and correct password @tc3', async({page}) => {
        const email = "Steve.Irwin.wrong@gmail.com";
        const password = "Steve@123"

        await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded'})
        await expect(page).toHaveURL('https://automationexercise.com');
        await expect(page).toHaveTitle('Automation Exercise');

        await page.locator('text=Signup / Login').click();
        await expect(page).toHaveURL('https://automationexercise.com/login');
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');

        await page.locator('[data-qa="login-email"]').fill(email);

        await page.locator('[data-qa="login-password"]').fill(password);

        await page.locator('[data-qa="login-button"]').click();

        await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    });

    test('Login User with correct email and incorrect password @tc4', async({page}) => {
        const email = "Steve.Irwin@gmail.com";
        const password = "Incorrect@123"

        await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded'})
        await expect(page).toHaveURL('https://automationexercise.com');
        await expect(page).toHaveTitle('Automation Exercise');

        await page.locator('text=Signup / Login').click();
        await expect(page).toHaveURL('https://automationexercise.com/login');
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');

        await page.locator('[data-qa="login-email"]').fill(email);

        await page.locator('[data-qa="login-password"]').fill(password);

        await page.locator('[data-qa="login-button"]').click();

        await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    });
});