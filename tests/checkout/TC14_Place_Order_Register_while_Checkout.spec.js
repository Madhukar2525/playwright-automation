import { expect, test } from "@playwright/test";
import { HomePage } from "../../src/pages/home.page";
import { ProductPage } from "../../src/pages/product.page";
import { CartPage } from "../../src/pages/cart.page";
import { AuthPage } from "../../src/pages/auth.page";
import { Flows } from "../../src/flows/flows";
import users from '../../src/test-data/users.json' assert { type: 'json' };

test.describe('Checkout related test cases', { tag: ['@regression', '@checkout'] }, () => {
    /** @type {HomePage} */
    let homePage;

    /** @type {ProductPage} */
    let productPage;

    /** @type {CartPage} */
    let cartPage;

    /** @type {AuthPage} */
    let authPage;


    test.beforeEach('Launch website and verify homepage', async({page}) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        authPage = new AuthPage(page);

        await homePage.launchHomePage();
        await homePage.verifyHomepageIsLoaded();
    });

    test.skip('TC14: Place Order: Register while Checkout', { tag: ['@tc14'] }, async({page}) =>{
        const flows = new Flows(page);
        const tomUser = users.registerUsers.Tom;

        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        await productPage.addProductToCartFromList(2);
        await productPage.verifyAddToCartConfirmation();

        await productPage.clickViewCart();

        await cartPage.verifyCartPageIsLoaded();

        await cartPage.clickProceedToCheckout();

        await cartPage.clickRegisterAndLogin();

        await homePage.clickCart();
        await cartPage.verifyCartPageIsLoaded();

        const itemsCount = await cartPage.getCartProductCount();
        expect(itemsCount).toBeGreaterThan(0);

        await cartPage.verifyCartItemDetailsByIndex(1, { price: 400, quantity: 1 });

        await cartPage.clickProceedToCheckout();



        await flows.registerNewUser(tomUser);
        await authPage.deleteAccount();
    });
    
});