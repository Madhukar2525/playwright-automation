import { test, expect } from "@playwright/test";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class CheckoutPage{
    /**
     * @param {Page} page
     * 
    */
    constructor(page){
        this.page = page;
        this.addressDetailsHeading = page.getByRole('heading', { name: "Address Details"});
    }

    async verifyCheckoutPageIsLoaded(){
        await expect(this.page).toHaveURL('https://automationexercise.com/checkout');
        await expect(this.page).toHaveTitle('Automation Exercise - Checkout');
        await expect(this.addressDetailsHeading).toBeVisible();
        await expect(this.page.getByRole('heading', { name: "Review Your Order"})).toBeVisible();
        await expect(this.page.locator('h3', { hasText: "Your delivery address"})).toBeVisible();
        await expect(this.page.locator('h3', { hasText: "Your billing address"})).toBeVisible();
    }
}