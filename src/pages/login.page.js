import { expect } from "@playwright/test";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class LoginPage {
    /**
     * @param {Page} page
     */
    constructor(page){
        this.page = page;
        this.loginEmailTextbox = this.page.locator('[data-qa="login-email"]');
        this.loginPasswordTextbox = this.page.locator('[data-qa="login-password"]');
        this.loginButton = this.page.locator('[data-qa="login-button"]');
    }

    async performLogin(emailId, password) {
        await this.loginEmailTextbox.fill(emailId);
        await this.loginPasswordTextbox.fill(password);
        await this.loginButton.click();
    }
}