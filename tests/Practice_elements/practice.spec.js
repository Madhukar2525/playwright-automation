import { test, expect } from '@playwright/test';

test.describe('Test different Alerts dialog boxes @prac', () => {
    test('Click Ok on Confirm alert box', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/')
        await page.locator('text=JavaScript Alerts').click();

        await expect(page).toHaveURL('https://the-internet.herokuapp.com/javascript_alerts');

        page.once('dialog', async dialog => {
            await dialog.accept()
        })

        await page.locator('text=Click for JS Confirm').click()

        await expect(page.locator('text=You clicked: Ok')).toBeVisible()
    });

    test('Click Cancel on Confirm alert box', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/')
        await page.locator('text=JavaScript Alerts').click();

        await expect(page).toHaveURL('https://the-internet.herokuapp.com/javascript_alerts');

        page.once('dialog', async dialog => {
            await dialog.dismiss()
        })

        await page.locator('text=Click for JS Confirm').click()

        await expect(page.locator('text=You clicked: Cancel')).toBeVisible()
    });

    test('Click prompt alert box', async ({page}) =>{
        const name = "Mark"
        await page.goto('https://the-internet.herokuapp.com/')
        await page.locator('text=JavaScript Alerts').click();
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/javascript_alerts');

        page.once('dialog', async dialog => {
            await dialog.accept(name)
        })

        await page.locator('text=Click for JS Prompt').click()

        await expect(page.locator(`text=You entered: ${name}`)).toBeVisible()
    });

    test('Click Cancel on prompt alert box', async ({page}) =>{
        await page.goto('https://the-internet.herokuapp.com/')
        await page.locator('text=JavaScript Alerts').click();
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/javascript_alerts');

        page.once('dialog', async dialog => {
            await dialog.dismiss()
        })

        await page.locator('text=Click for JS Prompt').click()

        await expect(page.locator('text=You entered: null')).toBeVisible()
    });
});