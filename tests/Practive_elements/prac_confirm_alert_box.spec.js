import { test, expect } from '@playwright/test';
test.describe('Test Confirmation aletrt box @p5', () => {
    test('Test Press Ok on alert box @p51', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')

        page.once('dialog', async dialog => {
            await dialog.accept();
        })

        await page.locator('text=Confirmation Alert').click()
        await expect(page.locator('text=You pressed OK!')).toBeVisible()
    });

    test('Test Press Cancel on alert nox @52', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')

        page.once('dialog', async dialog => {
            await dialog.dismiss();
        });

        await page.locator('text=Confirmation Alert').click();
        await expect(page.locator('text=You pressed Cancel!')).toBeVisible()
    })
});

test.describe('Test Prompt ALert Box @p5', () => {
    test('Test prompt alert box by entering Name @p53', async ({ page }) => {
        const name = "John";
        await page.goto('https://testautomationpractice.blogspot.com/');

        page.once('dialog', async dialog => {
            await dialog.accept(name);
        })
        await page.locator('text=Prompt Alert').click();

        await expect(page.locator(`text=Hello ${name}! How are you today?`)).toBeVisible()
    });

    test('Test Press Cancel on prompt alert box @p53', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/');

        page.once('dialog', async dialog => {
            await dialog.dismiss();
        });

        await page.locator('text=Prompt Alert').click();

        await expect(page.locator('text=User cancelled the prompt.')).toBeVisible();
    });
});