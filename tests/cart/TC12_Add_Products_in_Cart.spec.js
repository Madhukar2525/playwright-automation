import { expect, test } from "@playwright/test";
import { HomePage } from "../../src/pages/home.page";
import { ProductPage } from "../../src/pages/product.page";
import { CartPage } from "../../src/pages/cart.page";

test.describe('Add Products in Cart test cases', { tag: ['@regression', '@cart', '@tc12'] }, () => {
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
        await homePage.verifyHomepageIsLoaded();
    });
    
    test('TC12: Add Products in Cart', { tag: ['@tc12-1'] }, async ({ page }) => {

        // -- Go to Products section
        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        // -- Add 1st product to the cart
        await productPage.addProductToCartFromList(1);
        await productPage.verifyAddToCartConfirmation();

        // -- Click Continue shopping button
        await page.getByRole('button', { name: "Continue Shopping" }).click();

        // -- Add 2nd product to the cart
        await productPage.addProductToCartFromList(2);
        await productPage.verifyAddToCartConfirmation();

        // -- Click View Cart
        await page.getByRole('link', { name: "View Cart" }).click();

        // -- Validations
        await cartPage.verifyCartPageIsLoaded();


        // -- Verify cart items quantity
        const cartProductsCount = await cartPage.getCartProductCount()
        expect(cartProductsCount).toBe(2);

        // -- Verify first item details --
        await cartPage.verifyCartItemDetailsByIndex(1, { price: 500, quantity: 1 });

        // -- Verify second item details --
        await cartPage.verifyCartItemDetailsByIndex(2, { price: 400, quantity: 1 });
    });

    test('TC12: Add 2nd and 3rd Products in Cart', { tag: ['@tc12-2'] }, async ({ page }) => {

        // -- Go to Products section
        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        // -- Add 1st product to the cart
        await productPage.addProductToCartFromList(2);
        await productPage.verifyAddToCartConfirmation();

        // -- Click Continue shopping button
        await page.getByRole('button', { name: "Continue Shopping" }).click();

        // -- Add 2nd product to the cart
        await productPage.addProductToCartFromList(3);
        await productPage.verifyAddToCartConfirmation();

        // -- Click View Cart
        await page.getByRole('link', { name: "View Cart" }).click();

        // -- Validations
        await cartPage.verifyCartPageIsLoaded();


        // -- Verify cart items quantity
        const cartProductsCount = await cartPage.getCartProductCount()
        expect(cartProductsCount).toBe(2);

        // -- Verify first item details --
        await cartPage.verifyCartItemDetailsByIndex(1, { price: 400, quantity: 1 });

        // -- Verify second item details --
        await cartPage.verifyCartItemDetailsByIndex(2, { price: 1000, quantity: 1 });
    });

    test('TC12: Add 4th and 7th Products in Cart', { tag: ['@tc12-3'] }, async ({ page }) => {

        // -- Go to Products section
        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        // -- Add 4th product to the cart
        await productPage.addProductToCartFromList(4);
        await productPage.verifyAddToCartConfirmation();

        // -- Click Continue shopping button
        await page.getByRole('button', { name: "Continue Shopping" }).click();

        // -- Add 7th product to the cart
        await productPage.addProductToCartFromList(7);
        await productPage.verifyAddToCartConfirmation();

        // -- Click View Cart
        await page.getByRole('link', { name: "View Cart" }).click();

        // -- Validations
        await cartPage.verifyCartPageIsLoaded();


        // -- Verify cart items quantity
        const cartProductsCount = await cartPage.getCartProductCount()
        expect(cartProductsCount).toBe(2);

        // -- Verify first item details --
        await cartPage.verifyCartItemDetailsByIndex(1, { price: 1500, quantity: 1 });

        // -- Verify second item details --
        await cartPage.verifyCartItemDetailsByIndex(2, { price: 1000, quantity: 1 });
    });

    test('TC12: Add 1st, 4th and 7th Products in Cart', { tag: ['@tc12-4'] }, async ({ page }) => {

        // -- Go to Products section
        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        // -- Add 1st product to the cart
        await productPage.addProductToCartFromList(1);
        await productPage.verifyAddToCartConfirmation();

        // -- Click Continue shopping button
        await page.getByRole('button', { name: "Continue Shopping" }).click();

        // -- Add 4th product to the cart
        await productPage.addProductToCartFromList(4);
        await productPage.verifyAddToCartConfirmation();

        // -- Click Continue shopping button
        await page.getByRole('button', { name: "Continue Shopping" }).click();

        // -- Add 7th product to the cart
        await productPage.addProductToCartFromList(7);
        await productPage.verifyAddToCartConfirmation();

        // -- Click View Cart
        await page.getByRole('link', { name: "View Cart" }).click();

        // -- Validations
        await cartPage.verifyCartPageIsLoaded();


        // -- Verify cart items quantity
        const cartProductsCount = await cartPage.getCartProductCount()
        expect(cartProductsCount).toBe(3);

        // -- Verify first item details --
        await cartPage.verifyCartItemDetailsByIndex(1, { price: 500, quantity: 1 });
        
        // -- Verify first item details --
        await cartPage.verifyCartItemDetailsByIndex(2, { price: 1500, quantity: 1 });

        // -- Verify second item details --
        await cartPage.verifyCartItemDetailsByIndex(3, { price: 1000, quantity: 1 });
    });

});