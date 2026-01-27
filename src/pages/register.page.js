import { expect } from "@playwright/test";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class RegisterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.signupName = this.page.locator('[data-qa="signup-name"]');
        this.signupEmail = this.page.locator('[data-qa="signup-email"]');
        this.signupButton = this.page.locator('[data-qa="signup-button"]');
        this.newsletterCheckbox = this.page.locator('[id="newsletter"]');
        this.offersCheckbox = this.page.locator('[id="optin"]');

    }

    async beginRegistration(fullName, emailId) {
        await this.signupName.fill(fullName);
        await this.signupEmail.fill(emailId);
        await this.signupButton.click();
    }

    /**
     * Subscribe to newsletter and/or promotional offers
     * @param {boolean} subscribeNewsletter - true to check newsletter
     * @param {boolean} subscribeOffers - true to check offers/opt-in
     */
    async subscribeToNewsletterAndOffers(subscribeNewsletter = false, subscribeOffers = false) {
        if (subscribeNewsletter) {
            await this.newsletterCheckbox.check();
            await expect(this.newsletterCheckbox).toBeChecked();
        } else {
            await this.newsletterCheckbox.uncheck();
            await expect(this.newsletterCheckbox).not.toBeChecked();
        }

        if (subscribeOffers) {
            await this.offersCheckbox.check();
            await expect(this.offersCheckbox).toBeChecked();
        } else {
            await this.offersCheckbox.uncheck();
            await expect(this.offersCheckbox).not.toBeChecked();
        }
    }


    async verifySignupPageLoaded() {
        await expect(this.page).toHaveTitle('Automation Exercise - Signup');
        await expect(this.page).toHaveURL("https://automationexercise.com/signup");
        await expect(this.page.getByRole('heading', { name: "Enter Account Information" })).toBeVisible()
    }

}