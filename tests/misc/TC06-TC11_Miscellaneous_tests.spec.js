import { test, expect } from '@playwright/test';
import users from '../../src/test-data/users.json' assert { type: 'json'};
import { HomePage } from '../../src/pages/home.page';
import { MiscPages } from '../../src/pages/misc.page';


test.describe('Misc test cases', { tag: ['@regression', '@misc'] }, () => {
    /** @type {HomePage} */
    let homepage;

    /** @type {MiscPages} */
    let miscPages;

    test.beforeEach('Launch website and validate homepage', async ({ page }) => {
        homepage = new HomePage(page);
        miscPages = new MiscPages(page);

        await homepage.launchHomePage();
        await homepage.verifyHomepageIsLoaded();
    });

    test('TC06: Contact Us Form', { tag: ['@tc06'] }, async ({ page }) => {
        const johnUser = users.loginUsers.John;
        const subject = "Refund is not credited";
        const message = "I cancelled one order which was prepaid, the parcel has been given to delivery person, but I havent received the refund amount yet.";

        await homepage.clickContactUs();
        await miscPages.verifyContactUsPageIsLoaded();

        await miscPages.fillContactForm(johnUser.fullName, johnUser.emailId, subject, message);

        // await page.setInputFiles('input[type="file"]', 'test-data/dummy_file.pdf');
        await page.locator('input[type="file"]').setInputFiles('src/test-data/dummy_file.pdf')

        page.once('dialog', async dialog => {
            console.log(`Dialog type: ${dialog.type()}`); // "confirm"
            console.log(`Dialog message: ${dialog.message()}`); // "Press OK to proceed"
            await dialog.accept(); // clicks OK
            // If you wanted Cancel: await dialog.dismiss();
        });


        await page.locator('[data-qa="submit-button"]').click();

        await miscPages.verifySuccessMessage()
        await miscPages.clickHome();
        await homepage.verifyHomepageIsLoaded();
    });

    test('TC07: Verify Test Cases Page', { tag: ['@tc07'] }, async ({ page }) => {
        await homepage.clickTestCases();
        await miscPages.verifyTestCasesPageIsLoaded();
    });

    test('TC10: Verify Subscription in home page', { tag: ['@tc10'] }, async ({ page }) => {
        const email = "user.name@gmail.com";

        await page.locator('[id="footer"]').scrollIntoViewIfNeeded();
        await expect(page.locator('h2', { hasText: "Subscription" })).toBeVisible();

        await miscPages.subscribeWithEmail(email);
        await expect(page.locator('.alert-success')).toHaveText(/You have been successfully subscribed!/i);
    });

    test('TC11: Verify Subscription in Cart page', { tag: ['@tc11'] }, async ({ page }) => {
        const email = "user@gmail.com";

        await homepage.clickCart();
        
        await page.locator('[id="footer"]').scrollIntoViewIfNeeded();

        await expect(page.locator('h2', { hasText: "Subscription" })).toBeVisible();

        await miscPages.subscribeWithEmail(email);
        await expect(page.locator('.alert-success')).toHaveText(/You have been successfully subscribed!/i);
    })

});