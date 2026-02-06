import { expect, test } from '@playwright/test';
import users from '../../src/test-data/users.json' assert { type: 'json'};
import { HomePage } from '../../src/pages/home.page';
import { AuthPage } from '../../src/pages/auth.page';
import { RegisterPage } from '../../src/pages/register.page';
import { Flows } from '../../src/flows/flows';

test.describe('Registration Test Cases', { tag: '@regression' }, () => {
    /** @type {HomePage} */
    let homepage;

    /** @type {AuthPage} */
    let authpage;

    /** @type {RegisterPage} */
    let registerpage;

    test.beforeEach('Launch homepage and validate', async ({ page }) => {
        homepage = new HomePage(page);
        authpage = new AuthPage(page);
        registerpage = new RegisterPage(page);
        await homepage.launchHomePage();
        await homepage.verifyHomepageIsLoaded();
    })
    test('TC01: Register User', { tag: ['@tc01', '@smoke'] }, async ({ page }) => {
        const markUser = users.registerUsers.Mark;

        await homepage.clickSignUpAndLogin();
        await homepage.verifySignUpAndLoginPage()
        await registerpage.beginRegistration(markUser.fullName, markUser.emailId);
        await registerpage.verifySignupPageIsLoaded();
        await registerpage.fillAccountInformation(markUser.title, markUser.password, markUser.dob.day, markUser.dob.month, markUser.dob.year);
        await registerpage.subscribeToNewsletterAndOffers(true, true);
        await expect(page.getByRole('heading', { name: "Address Information" })).toBeVisible();
        await registerpage.fillAddressInformation(markUser.firstName, markUser.lastName, markUser.company, markUser.address, markUser.address2, markUser.country, markUser.state, markUser.city, markUser.zipcode, markUser.mobile);
        await registerpage.clickCreateAccountButton()
        await authpage.verifyAccountCreatedPageIsLoaded();
        await authpage.clickContinueButton()
        await authpage.verifyUserIsLoggedIn(markUser.fullName)
        await authpage.deleteAccount();
    });

    test('Quick register user flow', { tag: ['@smoke', '@quick'] }, async({ page }) => {
        const flows = new Flows(page);
        const tinaUser = users.registerUsers.Tina;
        
        await homepage.clickSignUpAndLogin();
        await flows.registerNewUser(tinaUser);
        await authpage.deleteAccount();
    })
});