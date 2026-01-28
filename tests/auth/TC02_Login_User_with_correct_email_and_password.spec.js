import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';
import { LoginPage } from '../../src/pages/login.page';
import { AuthPage } from '../../src/pages/auth.page';
import users from '../../src/test-data/users.json' assert { type: 'json'};

test.describe('@regression', () => {
    /** @type {HomePage} */
    let homepage;

    /** @type {LoginPage} */
    let loginpage;

    /** @type {AuthPage} */
    let authpage;

    test.beforeEach('Launch website and validate homepage', async({ page }) => {
        homepage = new HomePage(page);
        loginpage = new LoginPage(page);
        authpage = new AuthPage(page);

        // Launch website
        await homepage.launchHomePage();
    });
    test('TC02: Login User with correct email and password @tc02 @smoke', async ({ page }) => {
        const johnUser = users.loginUsers.John;

        await homepage.clickSignUpAndLogin();
        await loginpage.performLogin(johnUser.emailId, johnUser.password);
        await authpage.verifyUserIsLoggedIn(johnUser.fullName);
        await homepage.verifyHomepage();
        await authpage.logoutAndAssertUserIsOnLoginPage();
    });

});