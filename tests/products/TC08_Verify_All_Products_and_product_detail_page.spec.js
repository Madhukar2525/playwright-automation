import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/home.page';
import { LoginPage } from '../../src/pages/login.page';
import { AuthPage } from '../../src/pages/auth.page';
import { ProductPage } from '../../src/pages/product.page';
import users from '../../src/test-data/users.json' assert { type: 'json'};

test.describe('Product Page Test Cases', { tag: ['@regression', '@products'] }, () => {
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

    test('TC08: Verify All Products and product detail page', { tag: ['@tc08']}, async ({ page }) => {

        // await page.getByRole('link', { name: 'Products' }).click()
        await homepage.clickProduct();

        // await expect(page).toHaveURL("https://automationexercise.com/products");
        // await expect(page).toHaveTitle("Automation Exercise - All Products");
        // await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible()
        // await expect(page.locator('[class="features_items"]')).toBeVisible();
        await productPage.verifyProductPageIsLoaded();

        const productsList = page.locator('[class="col-sm-4"]');
        const count = await productsList.count();
        expect(count).toBeGreaterThan(0);

        await productsList.nth(1).getByRole('link', { name: "View Product" }).click()

        await expect(page).toHaveURL('https://automationexercise.com/product_details/1')

        const productInfo = page.locator('[class="product-information"]')
        await expect(productInfo).toBeVisible()

        await expect(productInfo.locator('h2')).toHaveText('Blue Top');

        await expect(productInfo.locator('p', { hasText: "Category: Women > Tops" })).toBeVisible()

        await expect(productInfo.locator('span span')).toHaveText("Rs. 500");

        await expect(productInfo.locator('p', { hasText: "Availability" })).toBeVisible()

        await expect(productInfo.locator('p', { hasText: "Condition" })).toBeVisible()

        await expect(productInfo.locator('p', { hasText: "Brand" })).toBeVisible()
    })

});