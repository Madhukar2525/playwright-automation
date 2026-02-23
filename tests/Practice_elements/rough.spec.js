import { test, expect } from '@playwright/test';

test.describe('File upload and download test cases', () => {
    test('File download', { tag: ['@a10'] }, async ({ page }) => {
        await page.goto('https://practice-automation.com/');
        await page.getByRole('link', { name: "File Download" }).click();
        await expect(page).toHaveURL("https://practice-automation.com/file-download/");

        const downloadPromise = page.waitForEvent('download');
        await page.locator('[class="ml-3"]').first().click();

        const download = await downloadPromise;
        const fileName = download.suggestedFilename();
        console.log("Suggested file name is: ", fileName);
        await download.saveAs(`test-data/${fileName}`);

    });

    test('Download password protected file', { tag: ['@a20'] }, async ({ page }) => {
        await page.goto('https://practice-automation.com/');
        await page.getByRole('link', { name: "File Download" }).click();
        await expect(page).toHaveURL("https://practice-automation.com/file-download/");

        await page.locator('[class="ml-3"]').last().click();
        const newFrame = page.locator('#wpdm-lock-frame').contentFrame()
        await newFrame.getByRole('textbox', { name: 'Enter Password' }).click();
        await newFrame.getByRole('textbox', { name: 'Enter Password' }).fill('automateNow');

        const downloadPromise = page.waitForEvent('download');
        await newFrame.locator('input[value="Submit"]').click();
        const download = await downloadPromise;
        const fileName = download.suggestedFilename();
        await download.saveAs(`test-data/${fileName}`);

    });

    test('Test frames', {tag: ['@frame01']}, async ({ page }) => {
        await page.goto('https://practice-automation.com/');
        await page.getByRole('link', { name: "Iframes" }).click();
        await expect(page).toHaveURL("https://practice-automation.com/iframes/");

        const playwrightFrame = page.frameLocator('[id="iframe-1"]');
        // const playwrightFrame = page.frame('Playwright');

        const seleniumFrame = page.frameLocator('[id="iframe-2"]');
        // const seleniumFrame = page.frame('Selenium');
        
        await playwrightFrame.getByText("Search").click();
        await playwrightFrame.locator('[id="docsearch-input"]').fill('frames');

        await page.waitForTimeout(2000);

        await page.getByText('Me too!').scrollIntoViewIfNeeded();

        await seleniumFrame.locator('footer').scrollIntoViewIfNeeded()

        await page.waitForTimeout(2000)
        
    });

});