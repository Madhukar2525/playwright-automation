import { expect, test } from '@playwright/test';
import users from '../../src/test-data/users.json' assert { type: 'json'};
import { HomePage } from '../../src/pages/home.page';
import { AuthPage } from '../../src/pages/auth.page';
import { RegisterPage } from '../../src/pages/register.page';

test.describe('Registration with Existing Emailid Test Cases', { tag: '@regression' }, () => {
    /** @type {HomePage} */
    let homepage;

    /** @type {AuthPage} */
    let authpage;

    /** @type {RegisterPage} */
    let registerpage;

    // /** @type {RegisterNewUserFlow} */
    // let registerNewUserFlow;

    test.beforeEach('Launch homepage and validate', async ({ page }) => {
        homepage = new HomePage(page);
        authpage = new AuthPage(page);
        registerpage = new RegisterPage(page);
        await homepage.launchHomePage();
        await homepage.verifyHomepageIsLoaded();
    })
    test('TC05: Register User with existing email', { tag: ['@tc05'] }, async ({ page }) => {
        const steveUser = users.loginUsers.Steve;

        await homepage.clickSignUpAndLogin();
        await homepage.verifySignUpAndLoginPage();
        await registerpage.beginRegistration(steveUser.fullName, steveUser.emailId);
        await registerpage.verifyExistingEmailErrorMessage();

    });
});