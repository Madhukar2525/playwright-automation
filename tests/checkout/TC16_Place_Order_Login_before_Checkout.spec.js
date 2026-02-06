import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/home.page";
import { RegisterPage } from "../../src/pages/register.page";
import { LoginPage } from "../../src/pages/login.page";
import { AuthPage } from "../../src/pages/auth.page";
import { CartPage } from "../../src/pages/cart.page";
import users from '../../src/test-data/users.json' assert {type: 'json'}
import { ProductPage } from "../../src/pages/product.page";
import { CheckoutPage } from "../../src/pages/checkout.page";

test.describe('Checkout related test cases', { tag: ['@regression', '@checkout'] }, () => {
    /** @type {HomePage} */
    let homePage;

    /** @type {RegisterPage} */
    let registerPage;

    /** @type {LoginPage} */
    let loginPage;

    /** @type {AuthPage} */
    let authPage;

    /** @type {ProductPage} */
    let productPage;

    /** @type {CartPage} */
    let cartPage;

    /** @type {CheckoutPage} */
    let checkoutPage;

    test.beforeEach('Launch website and verify homepage', async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        authPage = new AuthPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await homePage.launchHomePage();
        await homePage.verifyHomepageIsLoaded();
    });

    test('TC16: Place Order: Login before Checkout', { tag: ['@tc16'] }, async ({ page }) => {
        const steveUser = users.loginUsers.Steve;

        await homePage.clickSignUpAndLogin();
        await homePage.verifySignUpAndLoginPage();

        await loginPage.performLogin(steveUser.emailId, steveUser.password);
        await authPage.verifyUserIsLoggedIn(steveUser.fullName);

        // await homePage.clickProduct();
        // await productPage.verifyProductPageIsLoaded();
        // await productPage.addProductToCartFromList(5);

        // await productPage.clickViewCart();
        await homePage.clickCart();
        await cartPage.verifyCartPageIsLoaded();

        await cartPage.clickProceedToCheckout();
        await checkoutPage.verifyCheckoutPageIsLoaded();
        await checkoutPage.verifyAddressDetails(); //add more validation later

        const checkoutCartItems = page.locator('[class="table table-condensed"]').locator('tbody').locator('tr');
        const count = await checkoutCartItems.count();
        console.log("cpunt is: ", count);
        expect(count).toBeGreaterThan(1);

        const item = checkoutCartItems.nth(0);
        const priceText = await item.locator('[class="cart_price"]').innerText();
        const quantityText = await item.locator('[class="cart_quantity"]').innerText();
        const totalText = await item.locator('[class="cart_total"]').innerText();
        // console.log("deatils are: ", priceText, quantityText, totalText)

        const actualPrice = Number(priceText.replace("Rs. ", ""));
        const actualQuantity = Number(quantityText);
        const actualTotal = Number(totalText.replace("Rs. ", ""));

        expect(actualPrice).toBe(600);
        expect(actualQuantity).toBe(2);
        expect(actualTotal).toBe(actualPrice * actualQuantity);

        let grandTotal=0;

        for (let i=0; i < count-1; i++){
            const item = checkoutCartItems.nth(i);
            const totalText = await item.locator('[class="cart_total"]').innerText();
            const actualTotal = Number(totalText.replace("Rs. ", ""));
            grandTotal+=actualTotal
        }
        console.log("grand total is: ", grandTotal)

        const actualGrandTotal = await checkoutCartItems.last()


    });
});