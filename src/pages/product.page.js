import { expect } from "@playwright/test";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class ProductPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.searchText = null;
        this.productsHeading = page.getByRole('heading', { name: 'All Products' });
        this.featuresItems = page.locator('[class="features_items"]');
        // this.productsList = page.locator('[class="col-sm-4"]');
        this.productsList = page.locator('[class="product-image-wrapper"]')
        this.productInfo = page.locator('[class="product-information"]');
        this.productName = this.productInfo.locator('h2');
        this.productCategory = this.productInfo.locator('p', { hasText: "Category:" });
        this.productPrice = this.productInfo.locator('span span');
        this.productAvailability = this.productInfo.locator('p', { hasText: "Availability" });
        this.productCondition = this.productInfo.locator('p', { hasText: "Condition" });
        this.productBrand = this.productInfo.locator('p', { hasText: "Brand" });
        this.searchProductTextbox = page.locator('[id="search_product"]');
        this.searchIconButton = page.locator('[id="submit_search"]');
        this.searchedProductsList = page.locator('[class="productinfo text-center"]');
        this.addToCartModal = page.locator('[class="modal-content"]');
        this.quantityBox = page.locator('[id="quantity"]');
        this.viewCartLink = page.locator('a', { hasText: "View Cart" });

        // Buttons
        this.addToCartButton = page.getByRole('button', { name: "Add to cart" })
    }

    async getProductsCount() {
        return await this.productsList.count();
    }

    async verifyProductPageIsLoaded() {
        await expect(this.page).toHaveURL("https://automationexercise.com/products");
        await expect(this.page).toHaveTitle("Automation Exercise - All Products");
        await expect(this.productsHeading).toBeVisible()
        await expect(this.featuresItems).toBeVisible();
    }

    async clickViewProductByIndex(index) {
        await this.productsList.nth(index-1).getByRole('link', { name: "View Product" }).click();
    }

    async verifyProductDetailsPageIsLoaded(index) {
        await expect(this.page).toHaveURL(`https://automationexercise.com/product_details/${index}`);
        await expect(this.page).toHaveTitle("Automation Exercise - Product Details");
        await expect(this.productInfo).toBeVisible();
    }

    async verifyProductDetails(productName, category, price) {
        await expect(this.productName).toHaveText(productName);
        await expect(this.productCategory).toHaveText(category);
        await expect(this.productPrice).toHaveText(price);
        await expect(this.productAvailability).toBeVisible();
        await expect(this.productCondition).toBeVisible();
        await expect(this.productBrand).toBeVisible();
    }

    async searchForProduct(productName) {
        this.searchText = productName;
        await this.searchProductTextbox.fill(productName);
        await this.searchIconButton.click();
    }

    async verifySearchResultPage() {
        if (!this.searchText) {
            throw new Error(
                'Search text is not set. Call searchForProduct() before verification.'
            );
        }
        await expect(this.page).toHaveURL(`https://automationexercise.com/products?search=${this.searchText}`);
        await expect(this.page.getByRole('heading', { name: "Searched Products" })).toBeVisible();
    }

    async getSearchedProductsCount(){
        return await this.searchedProductsList.count();
    }

    async verifyAllProductsContainsSearchText() {
        if (!this.searchText) {
            throw new Error(
                'Search text is not set. Call searchForProduct() first.'
            );
        }
        
        const sPCount = await this.getSearchedProductsCount();
        for (let i = 0; i < sPCount; i++) {
            const productName = (await this.searchedProductsList.nth(i).locator('p').innerText()).toLowerCase();
            console.log(`Product name of ${i + 1} is: `, productName);
            expect.soft(productName).toContain(this.searchText.toLowerCase())
        }
    }

    async addProductToCartFromList(index){
        const targetProduct = this.productsList.nth(index);
        await targetProduct.scrollIntoViewIfNeeded();
        await targetProduct.hover();
        await targetProduct.locator('[class="btn btn-default add-to-cart"]').nth(index).click();
    }

    async verifyAddToCartConfirmation(){
        await expect(this.addToCartModal).toBeVisible();
        await expect(this.addToCartModal.locator('[class="text-center"]', { hasText: 'Your product has been added to cart.' })).toBeVisible();
    }

    async setProductQuantity(quantity){
        await this.quantityBox.clear();
        await this.quantityBox.fill(String(quantity));
    }

    async clickAddToCart(){
        await this.addToCartButton.click();
    }

    async clickViewCart(){
        await this.viewCartLink.click();
    }
}