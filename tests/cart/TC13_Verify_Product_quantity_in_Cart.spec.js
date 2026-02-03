import { expect, test } from "@playwright/test";
import { HomePage } from "../../src/pages/home.page";
import { ProductPage } from "../../src/pages/product.page";
import { CartPage } from "../../src/pages/cart.page";

test.describe('Cart related test cases', { tag: ['@regression', '@cart'] }, () => {
    /** @type {HomePage} */
    let homePage;

    /** @type {ProductPage} */
    let productPage;

    /** @type {CartPage} */
    let cartPage;


    test.beforeEach('Launch website and verify homepage', async({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await homePage.launchHomePage();
        await homePage.verifyHomepageIsLoaded();
    });

    test('TC13: Verify Product quantity in Cart', { tag: ['@tc13'] }, async ({ page }) => {

        // -- Go to Products section
        await homePage.clickProduct();
        await productPage.verifyProductPageIsLoaded();

        const count = await productPage.getProductsCount();
        expect(count).toBeGreaterThan(0);

        const productNum = 1;
        await productPage.clickViewProductByIndex(productNum);
        await productPage.verifyProductDetailsPageIsLoaded(productNum);

        // -- Increase quantity to 4
        const productQuantity = 4
        await productPage.setProductQuantity(productQuantity);

        // -- Click Add to cart button
        await productPage.clickAddToCart();
        await productPage.verifyAddToCartConfirmation();

        // -- Click View Cart button
        await productPage.clickViewCart();
        await cartPage.verifyCartPageIsLoaded();

        const cartItemsCount = await cartPage.getCartProductCount();
        expect(cartItemsCount).toBeGreaterThan(0);

        await cartPage.verifyCartItemDetailsByIndex(1, { price: 500, quantity: productQuantity });

    });

});