import { expect, test } from "@playwright/test";
import { AuthPage } from "../../src/pages/auth.page";
import { LoginPage } from "../../src/pages/login.page";
import { HomePage } from "../../src/pages/home.page";

import users from '../../src/test-data/users.json' assert { type: 'json'}
import { log } from "node:console";

test.describe('Login User with incorrect email and password', { tag: '@regression'}, () => {
    /** @type {HomePage} */
    let homepage;

    /** @type {AuthPage} */
    let authpage;

    /** @type {LoginPage} */
    let loginpage;

    test.beforeEach('Launch website and validate homepage', async({ page }) => {
        homepage = new HomePage(page);
        authpage = new AuthPage(page);
        loginpage = new LoginPage(page);

        await homepage.launchHomePage();
        await homepage.verifyHomepage();
    })

    test('TC03: Login User with incorrect email and correct password', { tag: ['@smoke', '@tc03']}, async({ page }) => {
        const emailId = "Steve.Irwin.wrong@gmail.com";
        const password = "Steve@123";
        await homepage.clickSignUpAndLogin();
        await homepage.verifySignUpAndLoginPage();

        await loginpage.performLogin(emailId, password);
        await loginpage.verifyIncorrectLoginErrorMessage();
    });

    test('TC03: Login User with correct email and incorrect password', { tag: ['@smoke', '@tc03']}, async({ page }) => {
        const emailId = "Steve.Irwin@gmail.com";
        const password = "IncorrectPassword";

        await homepage.clickSignUpAndLogin();
        await homepage.verifySignUpAndLoginPage();
        await loginpage.performLogin(emailId, password);
        await loginpage.verifyIncorrectLoginErrorMessage();
    });
});