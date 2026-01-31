import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';
import { LoginPage } from '../../src/pages/login.page';
import { AuthPage } from '../../src/pages/auth.page';
import { ProductPage } from '../../src/pages/product.page';
import users from '../../src/test-data/users.json' assert { type: 'json'};

test.describe('Product Page Test Cases', { tag: ['@regression', '@products', '@tc08'] }, () => {
    /** @type {HomePage} */
    let homepage;

    /** @type {LoginPage} */
    let loginpage;

    /** @type {AuthPage} */
    let authpage;

    /** @type {ProductPage} */
    let productPage;

    test.beforeEach('Launch website and validate homepage', async ({ page }) => {
        homepage = new HomePage(page);
        loginpage = new LoginPage(page);
        authpage = new AuthPage(page);
        productPage = new ProductPage(page);

        // Launch website
        await homepage.launchHomePage();
        await homepage.verifyHomepage()
    });

    test('TC08: Verify All Products page and 1st product detail page', { tag: ['@tc08-1']}, async ({ page }) => {
        await homepage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        const productNo = 1;
        await productPage.clickViewProductByIndex(productNo);
        await productPage.verifyProductDetailsPageIsLoaded(productNo)

        await productPage.verifyProductDetails("Blue Top", "Category: Women > Tops", "Rs. 500");
    });

    test('TC08: Verify All Products page and 2nd product detail page', { tag: ['@tc08-2']}, async ({ page }) => {
        await homepage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        const productNo = 2;
        await productPage.clickViewProductByIndex(productNo);
        await productPage.verifyProductDetailsPageIsLoaded(productNo);

        await productPage.verifyProductDetails("Men Tshirt", "Category: Men > Tshirts", "Rs. 400");
    });

});