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
        this.productsList = page.locator('[class="col-sm-4"]');
        this.productInfo = page.locator('[class="product-information"]');
        this.productName = this.productInfo.locator('h2');
        this.productCategory = this.productInfo.locator('p', { hasText: "Category:" });
        this.productPrice = this.productInfo.locator('span span');
        this.productAvailability = this.productInfo.locator('p', { hasText: "Availability" });
        this.productCondition = this.productInfo.locator('p', { hasText: "Condition" });
        this.productBrand = this.productInfo.locator('p', { hasText: "Brand" });
    }

    async getProductsCount(){
        return await this.productsList.count();
    }

    async verifyProductPageIsLoaded(){
        await expect(this.page).toHaveURL("https://automationexercise.com/products");
        await expect(this.page).toHaveTitle("Automation Exercise - All Products");
        await expect(this.productsHeading).toBeVisible()
        await expect(this.featuresItems).toBeVisible();
    }

    async clickViewProductByIndex(index){
        await this.productsList.nth(index).getByRole('link', { name: "View Product" }).click()
    }

    async verifyProductDetailsPageIsLoaded(index){
        await expect(this.page).toHaveURL(`https://automationexercise.com/product_details/${index}`)
        await expect(this.productInfo).toBeVisible()
    }

    async verifyProductDetails(productName, category,price){
        await expect(this.productName).toHaveText(productName);
        await expect(this.productCategory).toHaveText(category);
        await expect(this.productPrice).toHaveText(price);
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
    }
}