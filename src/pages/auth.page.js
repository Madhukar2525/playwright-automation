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
        this.continueButton = page.locator('[data-qa="continue-button"]')
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

    async clickLogout(){
        await this.logoutButton.click();
        await expect(this.page).toHaveTitle('Automation Exercise - Signup / Login');
        await expect(this.page).toHaveURL("https://automationexercise.com/login");
    }

    async clickDeleteAccount(){
        await this.deleteAccountButton.click();
        await expect(this.page).toHaveTitle('Automation Exercise');
        await expect(this.page).toHaveURL("https://automationexercise.com");
    }
}