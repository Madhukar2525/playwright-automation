import { expect } from "@playwright/test";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class ProductPage {
    /**
     * @param {Page} page
     */
    constructor(page){
        this.page = page;
        this.productsHeading = page.getByRole('heading', { name: 'All Products' });
        this.featuresItems = page.locator('[class="features_items"]');
    }

    async verifyProductPageIsLoaded(){
        await expect(this.page).toHaveURL("https://automationexercise.com/products");
        await expect(this.page).toHaveTitle("Automation Exercise - All Products");
        await expect(this.productsHeading).toBeVisible()
        await expect(this.featuresItems).toBeVisible();
    }
}