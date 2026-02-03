import { expect, test } from "@playwright/test";
import { HomePage } from "../../src/pages/home.page";
import { ProductPage } from "../../src/pages/product.page";

test.describe('Search Product', { tag: ['@regression'] }, () => {
    /** @type {HomePage} */
    let homePage;

    /** @type {ProductPage} */
    let productPage;

    test.beforeEach('Launch the website and validate homepage', async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);

        await homePage.launchHomePage();
        await homePage.verifyHomepage();
    });

    test('TC09: Search Product', { tag: ['@tc09']}, async ({ page }) => {
        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const productsCount = await productPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);

        await productPage.searchForProduct("blue")

        // await expect(page).toHaveURL(`https://automationexercise.com/products?search=${searchText}`);
        // await expect(page.getByRole('heading', { name: "Searched Products" })).toBeVisible();
        await productPage.verifySearchResultPage();

        const spCount = await productPage.getSearchedProductsCount();
        expect(spCount).toBeGreaterThan(0);

        // const searchedProductsList = page.locator('[class="productinfo text-center"]');
        // const sPCount = await searchedProductsList.count();
        // console.log("total products count is: ", sPCount)
        // expect(sPCount).toBeGreaterThan(0);

        // for (let i = 0; i < sPCount; i++) {
        //     const productName = (await searchedProductsList.nth(i).locator('p').innerText()).toLowerCase();
        //     console.log(`Product name of ${i + 1} is: `, productName);
        //     expect.soft(productName).toContain(searchText)
        // }
        await productPage.verifyAllProductsContainsSearchText();

    });

});