import { expect, test } from "@playwright/test";
import { HomePage } from "../../src/pages/home.page";
import { ProductPage } from "../../src/pages/product.page";
import { CartPage } from "../../src/pages/cart.page";

test.describe('Add Products in Cart test cases', { tag: ['@regression', '@cart'] }, () => {
    /** @type {HomePage} */
    let homePage;

    /** @type {ProductPage} */
    let productPage;

    /** @type {CartPage} */
    let cartPage;

    test.beforeEach("Launch website and verify homepage", async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await homePage.launchHomePage();
        await homePage.verifyHomepage();
    });
    test('TC12: Add Products in Cart', { tag: ['@tc12'] }, async ({ page }) => {

        // -- Go to Products section
        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        // -- Add 1st product to the cart
        await productPage.addProductToCartByIndex(0);
        await productPage.verifyAddToCartConfirmation();

        // -- Click Continue shopping button
        await page.getByRole('button', { name: "Continue Shopping" }).click();

        // -- Add 2nd product to the cart
        await productPage.addProductToCartByIndex(1);
        await productPage.verifyAddToCartConfirmation();

        // -- Click View Cart
        await page.getByRole('link', { name: "View Cart" }).click();

        // -- Validations
        await cartPage.verifyCartPageIsLoaded();


        // -- Verify Product details
        const cartProductsCount = await cartPage.getCartProductCount()
        expect(cartProductsCount).toBe(2);

        // -- Verify first item details --
        await cartPage.verifyCartItemDetailsByIndex(1, { price: 500, quantity: 1 });

        // -- Verify second item details --
        await cartPage.verifyCartItemDetailsByIndex(2, { price: 400, quantity: 1 });
    });

});