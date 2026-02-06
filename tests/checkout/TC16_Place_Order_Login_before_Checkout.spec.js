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

        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();
        await productPage.addProductToCartFromList(5);

        await productPage.clickViewCart();
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
        expect(actualQuantity).toBe(1);
        expect(actualTotal).toBe(actualPrice * actualQuantity);

        let calculatedGrandTotal = 0;

        for (let i = 0; i < count - 1; i++) {
            const item = checkoutCartItems.nth(i);
            const totalText = await item.locator('[class="cart_total"]').innerText();
            const actualTotal = Number(totalText.replace("Rs. ", ""));
            calculatedGrandTotal += actualTotal
        }
        console.log("grand total is: ", calculatedGrandTotal)

        const actualGrandTotal = Number((await checkoutCartItems.last().locator('[class="cart_total_price"]').innerText()).replace("Rs. ", ""));
        expect(actualGrandTotal).toBe(calculatedGrandTotal);

        await page.locator('[class="form-control"]').fill("Please try to deliver my product as soon as possible.");

        await page.getByRole('link', { name: "Place Order" }).click();

        await expect(page).toHaveURL("https://automationexercise.com/payment");
        await expect(page).toHaveTitle("Automation Exercise - Payment");

        await expect(page.getByRole('heading', { name: "Payment" })).toBeVisible();
        // await expect(page.locator('[id="payment-form"]')).toBeVisible();

        const nameOnCardTextbox = page.locator('input[data-qa="name-on-card"]');
        const cardNumberTextbox = page.locator('input[data-qa="card-number"]');
        const cvcTextbox = page.locator('input[data-qa="cvc"]');
        const expirationMonthTextbox = page.locator('input[data-qa="expiry-month"]');
        const expirationYearTextbox = page.locator('input[data-qa="expiry-year"]');
        await expect(nameOnCardTextbox).toBeVisible();
        await expect(nameOnCardTextbox).toBeEditable();

        await expect(cardNumberTextbox).toBeVisible();
        await expect(cardNumberTextbox).toBeEditable();

        await expect(cvcTextbox).toBeVisible();
        await expect(cvcTextbox).toBeEditable();

        await expect(expirationMonthTextbox).toBeVisible();
        await expect(expirationMonthTextbox).toBeEditable();

        await expect(expirationYearTextbox).toBeVisible();
        await expect(expirationYearTextbox).toBeEditable();

        await nameOnCardTextbox.fill("Steve Iwrin");
        await cardNumberTextbox.fill("1212 2323 3434 4545");
        await cvcTextbox.fill("123");
        await expirationMonthTextbox.fill("07");
        await expirationYearTextbox.fill("2030");

        await page.getByRole('button', { name: "Pay and Confirm Order" }).click();

        await expect(page).toHaveURL(`https://automationexercise.com/payment_done/${actualGrandTotal}`);
        await expect(page).toHaveTitle("Automation Exercise - Order Placed");

        const orderPlacedTitle = page.locator('[data-qa="order-placed"]');

        await expect(orderPlacedTitle).toBeVisible();
        await expect(orderPlacedTitle).toHaveText('Order Placed!');

        const confirmationMsg = page.getByText('Congratulations! Your order has been confirmed!');

        await expect(confirmationMsg).toBeVisible();

        await page.getByRole('link', { name: "Download Invoice"}).click();

        await page.locator('[data-qa="continue-button"]').click();

        await homePage.verifyHomepageIsLoaded();
        await authPage.verifyUserIsLoggedIn(steveUser.fullName);

    });
});