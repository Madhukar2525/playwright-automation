import { test, expect } from '@playwright/test';
import fs from 'fs';
import { promiseHooks } from 'v8';

test.describe('Test different Alerts dialog boxes @prac', { tag: ['@alertsAll'] }, () => {

    test('File download test case 1', async ({ page }) => {
        await page.goto('https://www.tutorialspoint.com/selenium/practice/upload-download.php');

        const downloadPromise = page.waitForEvent('download');
        await page.locator('a[id="downloadButton"]').click();

        const download = await downloadPromise;
        await download.saveAs('test-data/downloadedFile.jpeg');
        // await page.waitForTimeout(3000);
    });

    test('File download test case 2', async ({ page }) => {
        await page.goto('https://www.tutorialspoint.com/selenium/practice/upload-download.php');

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('a[id="downloadButton"]').click()
        ]);

        await download.saveAs('test-data/newlyDownloaded.jpeg')
    });

    test('Test Alert popup', { tag: ['@alert01'] }, async ({ page }) => {
        await page.goto('https://practice-automation.com/');
        await page.getByRole('link', { name: "Popups" }).click();
        await expect(page).toHaveURL("https://practice-automation.com/popups/");

        page.on('dialog', async d => {
            await d.accept();
        });

        await page.getByRole('button', { name: "Alert Popup" }).click()
    });

    test('Test confirm popup > Press Ok', { tag: ['@alert02', '@alert02-1'] }, async ({ page }) => {
        await page.goto('https://practice-automation.com/');
        await page.getByRole('link', { name: "Popups" }).click();
        await expect(page).toHaveURL("https://practice-automation.com/popups/");

        page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await page.getByRole('button', { name: "Confirm Popup" }).click()
        await expect(page.locator('[id="confirmResult"]')).toHaveText('OK it is!')
    });

    test('Test confirm popup > Press Cancel', { tag: ['@alert02', '@alert02-2'] }, async ({ page }) => {
        await page.goto('https://practice-automation.com/');
        await page.getByRole('link', { name: "Popups" }).click();
        await expect(page).toHaveURL("https://practice-automation.com/popups/");

        page.on('dialog', async dialog => {
            await dialog.dismiss();
        });

        await page.getByRole('button', { name: "Confirm Popup" }).click()
        await expect(page.locator('[id="confirmResult"]')).toHaveText('Cancel it is!')
    });

    test('Test prompt popup > Enter Name', { tag: ['@alert03', '@alert03-1'] }, async ({ page }) => {
        await page.goto('https://practice-automation.com/');
        await page.getByRole('link', { name: "Popups" }).click();
        await expect(page).toHaveURL("https://practice-automation.com/popups/");

        const name = "Josh";
        page.on('dialog', async dialog => {
            await dialog.accept(name);
        })

        await page.getByRole('button', { name: "Prompt Popup" }).click();
        await expect(page.locator('[id="promptResult"]')).toHaveText(`Nice to meet you, ${name}!`)
    });

    test('Test prompt popup > Press Cancel', { tag: ['@alert03', '@alert03-2'] }, async ({ page }) => {
        await page.goto('https://practice-automation.com/');
        await page.getByRole('link', { name: "Popups" }).click();
        await expect(page).toHaveURL("https://practice-automation.com/popups/");

        await page.getByRole('button', {name: "Prompt Popup"}).click();
        await expect(page.locator('[id="promptResult"]')).toHaveText('Fine, be that way...')
    });

});