import { expect, test } from "@playwright/test";

test.fixme('TC12: Add Products in Cart @tc12 @regression', async ({ page }) => {
    const firstName = "John";
    const lastName = "Cena";
    const email = firstName + "." + lastName + "@gmail.com";
    const fullName = firstName + " " + lastName;
    const password = firstName + "@123"

    // Launch website and verify homepage
    await page.goto("https://automationexercise.com", { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    // // Login with email and password
    // await page.locator('text=Signup / Login').click();
    // await expect(page).toHaveURL("https://automationexercise.com/login");
    // await expect(page).toHaveTitle("Automation Exercise - Signup / Login");

    // await page.locator('[data-qa="login-email"]').fill(email);
    // await page.locator('[data-qa="login-password"]').fill(password)
    // await page.locator('[data-qa="login-button"]').click()

    // const username = page.locator('text=Logged in as');
    // await expect(username).toBeVisible();
    // await expect(username).toContainText(fullName)
    // // await expect(username.locator('b')).toHaveText(fullName);

    // Go to Products section
    await page.getByRole('link', { name: 'Products' }).click()
    await expect(page).toHaveURL("https://automationexercise.com/products");
    await expect(page).toHaveTitle("Automation Exercise - All Products");
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible()
    await expect(page.locator('[class="features_items"]')).toBeVisible();

    const productsList = page.locator('[class="product-image-wrapper"]');
    const productsCount = await productsList.count();
    expect(productsCount).toBeGreaterThan(0);

    // -- Add 1st product to the cart
    const firstProduct = productsList.nth(0);
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.hover();
    await firstProduct.locator('[class="btn btn-default add-to-cart"]').nth(0).click();

    // -- Click Continue shopping button
    await page.getByRole('button', { name: "Continue Shopping"}).click();

    // -- Add 2nd product to the cart
    const secondProduct = productsList.nth(1);
    await secondProduct.scrollIntoViewIfNeeded();
    await secondProduct.hover();
    await secondProduct.locator('[class="btn btn-default add-to-cart"]').nth(1).click();

    // -- Click View Cart
    const modal = page.locator('[class="modal-content"]')
    await expect(modal).toBeVisible();
    await expect(modal.locator('[class="text-center"]', { hasText: 'Your product has been added to cart.'})).toBeVisible()
    await modal.locator('a', { hasText: "View Cart"}).click()
    // Validations
    await expect(page).toHaveURL("https://automationexercise.com/view_cart");
    await expect(page).toHaveTitle("Automation Exercise - Checkout");

    // -- Verify Product details
    const cartRows = page.locator('[id="cart_info_table"]').locator('tbody').locator('tr');
    // const cartRows = page.locator('#cart_info_table tbody tr')
    await expect(cartRows).toHaveCount(2);

    // -- Verify first item --
    const firstItem = cartRows.nth(0);
    const priceText = await firstItem.locator('[class="cart_price"]').innerText();
    const quantityText = await firstItem.locator('[class="cart_quantity"]').innerText();
    const totalText = await firstItem.locator('[class="cart_total"]').innerText();
    // console.log("deatils are: ", priceText, quantityText, totalText)

    const price = Number(priceText.replace("Rs. ", ""));
    const quantity = Number(quantityText);
    const total = Number(totalText.replace("Rs. ", ""));

    expect(price).toBe(500)
    expect(quantity).toBe(1)
    expect(total).toBe(price*quantity)
})