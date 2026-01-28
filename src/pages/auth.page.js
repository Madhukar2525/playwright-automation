import { expect } from '@playwright/test';
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class AuthPage {
    /**
     * @param {Page} page
     */
    constructor(page){
        this.page = page;
        this.deleteAccountButton = page.getByRole('link', { name: "Delete Account" });
        this.logoutButton = page.getByRole('link', { name: "Logout" });
        this.accountDeletedHeading = page.getByRole('heading', { name: "Account Deleted!" });
        this.continueButton = page.locator('[data-qa="continue-button"]');
        this.loggedInButton = (fullName) => this.page.locator(`text=Logged in as ${fullName}`);
        this.accountCreatedHeading = this.page.getByRole('heading', { name: "Account Created!" });
        this.continueButton = this.page.locator('[data-qa="continue-button"]');
    }

    async deleteAccount(){
        await this.deleteAccountButton.click();
        await expect(this.page).toHaveTitle('Automation Exercise - Account Created');
        await expect(this.page).toHaveURL("https://automationexercise.com/delete_account");

        await expect(this.accountDeletedHeading).toBeVisible();
        await this.continueButton.click()
        await expect(this.page).toHaveURL("https://automationexercise.com");
        await expect(this.page).toHaveTitle("Automation Exercise");
    }

    async logoutAndAssertUserIsOnLoginPage(){
        await this.logoutButton.click();
        await expect(this.page).toHaveTitle('Automation Exercise - Signup / Login');
        await expect(this.page).toHaveURL("https://automationexercise.com/login");
    }

    async clickLogout(){
        await this.logoutButton.click();
    }

    async clickDeleteAccount(){
        await this.deleteAccountButton.click();
    }

    async verifyUserIsLoggedIn(fullName){
        await expect(this.page).toHaveURL("https://automationexercise.com");
        await expect(this.page).toHaveTitle("Automation Exercise");
        await expect(this.loggedInButton(fullName)).toBeVisible();
        await expect(this.deleteAccountButton).toBeVisible()
        await expect(this.logoutButton).toBeVisible()
    }

    async verifyAccountCreatedPageIsLoaded(){
        await expect(this.page).toHaveTitle('Automation Exercise - Account Created');
        await expect(this.page).toHaveURL("https://automationexercise.com/account_created");
        await expect(this.accountCreatedHeading).toBeVisible()
    }

    async clickContinueButton(){
        await this.continueButton.click()
    }
}