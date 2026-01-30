import { expect } from '@playwright/test';

export class MiscPages {
    constructor(page) {
        this.page = page;

        // Page identifiers
        this.getInTouchHeader = page.getByText('GET IN TOUCH');
        this.contactForm = page.locator('#contact-us-form');

        // Form fields
        this.nameInput = page.locator('input[data-qa="name"]');
        this.emailInput = page.locator('input[data-qa="email"]');
        this.subjectInput = page.locator('input[data-qa="subject"]');
        this.messageTextarea = page.locator('textarea[data-qa="message"]');
        this.uploadFileInput = page.locator('input[type="file"]');

        // Buttons
        this.submitButton = page.locator('input[data-qa="submit-button"]');
        this.homeButton = page.locator('i[class="fa fa-angle-double-left"]');

        // Messages
        this.successMessage = page.locator('div[class="status alert alert-success"]');
    }

    // ---------- Verifications ----------
    async verifyContactUsPageIsLoaded() {
        await expect(this.page).toHaveURL(/contact_us/);
        await expect(this.getInTouchHeader).toBeVisible();
        await expect(this.contactForm).toBeVisible();
    }

    async verifySuccessMessage() {
        await expect(this.successMessage).toBeVisible();
    }

    // ---------- Actions ----------
    async fillContactForm(name, email, subject, message) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageTextarea.fill(message);
    }

    async clickHome() {
        await this.homeButton.click();
    }

    // async uploadFile(filePath) {
    //     await this.uploadFileInput.setInputFiles(filePath);
    // }

    // async submitFormAndAcceptAlert() {
    //     this.page.once('dialog', dialog => dialog.accept());
    //     await this.submitButton.click();
    // }
}
