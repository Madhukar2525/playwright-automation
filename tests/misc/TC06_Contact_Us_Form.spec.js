import { test, expect } from '@playwright/test';
import users from '../../src/test-data/users.json' assert { type: 'json'};
import { HomePage } from '../../src/pages/home.page';
import { MiscPages } from '../../src/pages/misc.page';


test.describe('Misc test cases', { tag: '@regression' }, () => {
    /** @type {HomePage} */
    let homepage;

    /** @type {MiscPages} */
    let miscPages;

    test.beforeEach('Launch website and validate homepage', async({page}) => {
        homepage = new HomePage(page);
        miscPages = new MiscPages(page);

        await homepage.launchHomePage();
        await homepage.verifyHomepage();
    });

    test('TC05: Contact Us Form', { tag: ['@tc06'] }, async ({ page }) => {
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
        await homepage.verifyHomepage();
    });

});