import { expect, test } from "@playwright/test";
import { HomePage } from "../../src/pages/home.page";
import { ProductPage } from "../../src/pages/product.page";

test.describe('Search Product', { tag: ['@regression', '@products'] }, () => {
    /** @type {HomePage} */
    let homePage;

    /** @type {ProductPage} */
    let productPage;

    test.beforeEach('Launch the website and validate homepage', async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);

        await homePage.launchHomePage();
        await homePage.verifyHomepageIsLoaded();
    });

    test('TC09: Search Product', { tag: ['@tc09']}, async ({ page }) => {
        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const productsCount = await productPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);

        await productPage.searchForProduct("blue")

        await productPage.verifySearchResultPage();

        const spCount = await productPage.getSearchedProductsCount();
        expect(spCount).toBeGreaterThan(0);

        await productPage.verifyAllProductsContainsSearchText();

    });

});