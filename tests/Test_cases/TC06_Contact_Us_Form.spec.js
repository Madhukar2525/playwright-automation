import { test, expect } from '@playwright/test';
import path from 'path';


test('TC05: Contact Us Form @tc6 @regression', async ({ page }) => {
    const firstName = "Steve";
    const lastName = "Irwin";
    const email = firstName + "." + lastName + "@gmail.com";
    const fullName = firstName + " " + lastName;
    const password = firstName + "@123"

    await page.goto("https://automationexercise.com", { waitUntil: 'domcontentloaded'});
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    await page.locator('text=Contact Us').click();
    await expect(page.locator('text=Get In Touch')).toBeVisible();
    await page.locator('[data-qa="name"]').fill(firstName);

    await page.locator('[data-qa="email"]').fill(email);

    await page.locator('[data-qa="subject"]').fill('Refund is not credited');

    await page.locator('[data-qa="message"]').fill('I cancelled one order which was prepaid, the parcel has been given to delivery person, but I havent received the refund amount yet.');

    // await page.setInputFiles('input[type="file"]', 'test-data/dummy_file.pdf');
    await page.locator('input[type="file"]').setInputFiles('test-data/dummy_file.pdf')

    page.once('dialog', async dialog => {
        console.log(`Dialog type: ${dialog.type()}`); // "confirm"
        console.log(`Dialog message: ${dialog.message()}`); // "Press OK to proceed"
        await dialog.accept(); // clicks OK
        // If you wanted Cancel: await dialog.dismiss();
    });

    
    await page.locator('[data-qa="submit-button"]').click();

    // await expect(page.getByText('Success! Your details have been submitted successfully.').nth(0)).toBeVisible();
    await expect(page.locator('div[class="status alert alert-success"]')).toBeVisible()

    // await page.getByText('Home').click();
    await page.locator('i[class="fa fa-angle-double-left"]').click()
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

});