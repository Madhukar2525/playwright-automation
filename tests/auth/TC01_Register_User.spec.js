import { expect, test } from '@playwright/test';
import users from '../../src/test-data/users.json' assert { type: 'json'};
import { HomePage } from '../../src/pages/home.page';
import { AuthPage } from '../../src/pages/auth.page';
import { RegisterPage } from '../../src/pages/register.page';


test.describe('@regression', () => {
    /** @type {HomePage} */
    let homepage;

    /** @type {AuthPage} */
    let authpage;

    /** @type {RegisterPage} */
    let registerpage;

    test.beforeEach('Launch homepage and validate', async ({ page }) => {
        homepage = new HomePage(page)
        authpage = new AuthPage(page);
        registerpage = new RegisterPage(page);
        await homepage.launchHomePage();
    })
    test('TC1: Register User @tc01', async ({ page }) => {
        const markUser = users.registerUsers.Mark;

        await homepage.clickSignUpAndLogin();
        
        await expect(page.getByRole('heading', { name: "New User Signup!" })).toBeVisible();
        // await page.locator('[data-qa="signup-name"]').fill(markUser.fullName);
        // await page.locator('[data-qa="signup-email"]').fill(markUser.emailId);
        // await page.locator('[data-qa="signup-button"]').click();
        await registerpage.beginRegistration(markUser.fullName, markUser.emailId);

        // await expect(page).toHaveTitle('Automation Exercise - Signup');
        // await expect(page).toHaveURL("https://automationexercise.com/signup");
        // await expect(page.getByRole('heading', { name: "Enter Account Information" })).toBeVisible()
        await registerpage.verifySignupPageLoaded();

        await page.locator(`input[name="title"][value="${markUser.title}"]`).click();
        await expect(page.locator(`input[name="title"][value="${markUser.title}"]`)).toBeChecked()
        await page.locator('[data-qa="password"]').fill(markUser.password);
        await page.locator('[data-qa="days"]').selectOption(markUser.dob.day);
        await expect(page.locator('[data-qa="days"] option:checked')).toHaveText(markUser.dob.day)

        await page.locator('[data-qa="months"]').selectOption(markUser.dob.month);
        await expect(page.locator('[data-qa="months"]')).toHaveValue(markUser.dob.month);

        await page.locator('[data-qa="years"]').selectOption(markUser.dob.year);
        await expect(page.locator('[data-qa="years"]')).toHaveValue(markUser.dob.year)

        // await page.locator('[id="newsletter"]').check();
        // await expect(page.locator('[id="newsletter"]')).toBeChecked();
        // await page.locator('[id="optin"]').check();
        // await expect(page.locator('[id="optin"]')).toBeChecked();
        await registerpage.subscribeToNewsletterAndOffers(true, true);

        await expect(page.getByRole('heading', { name: "Address Information" })).toBeVisible();
        await page.locator('[data-qa="first_name"]').fill(markUser.firstName);
        await page.locator('[data-qa="last_name"]').fill(markUser.lastName);
        await page.locator('[data-qa="company"]').fill(markUser.company);
        await page.locator('[data-qa="address"]').fill(markUser.address);
        await page.locator('[data-qa="address2"]').fill(markUser.address2);
        await page.locator('[data-qa="country"]').selectOption(markUser.country);
        await expect(page.locator('[data-qa="country"]')).toHaveValue(markUser.country)

        await page.locator('[data-qa="state"]').fill(markUser.state);

        await page.locator('[data-qa="city"]').fill(markUser.city);

        await page.locator('[data-qa="zipcode"]').fill(markUser.zipcode);

        await page.locator('[data-qa="mobile_number"]').fill(markUser.mobile);

        await page.locator('[data-qa="create-account"]').click()

        // Verify successful registration
        await expect(page).toHaveTitle('Automation Exercise - Account Created');
        await expect(page).toHaveURL("https://automationexercise.com/account_created");

        await expect(page.getByRole('heading', { name: "Account Created!" })).toBeVisible()

        await page.locator('[data-qa="continue-button"]').click()

        await expect(page).toHaveURL("https://automationexercise.com");
        await expect(page).toHaveTitle("Automation Exercise");
        await expect(page.locator(`text=Logged in as ${markUser.fullName}`)).toBeVisible();
        await expect(page.getByRole('link', { name: "Delete Account" })).toBeVisible()
        await expect(page.getByRole('link', { name: "Logout" })).toBeVisible()

        // await page.getByRole('link', { name: "Delete Account" }).click();
        // await expect(page).toHaveTitle('Automation Exercise - Account Created');
        // await expect(page).toHaveURL("https://automationexercise.com/delete_account");

        // await expect(page.getByRole('heading', { name: "Account Deleted!" })).toBeVisible();
        // await page.locator('[data-qa="continue-button"]').click()
        // await expect(page).toHaveURL("https://automationexercise.com");
        // await expect(page).toHaveTitle("Automation Exercise");
        await authpage.deleteAccount();


        await page.waitForTimeout(3000);
    })
});