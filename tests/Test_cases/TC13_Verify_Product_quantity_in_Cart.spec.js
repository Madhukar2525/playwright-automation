import { expect, test } from "@playwright/test";

test('TC13: Verify Product quantity in Cart @tc13 @regression', async({ page }) => {
    await page.goto("https://automationexercise.com", { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    // -- Go to Products section
    await page.getByRole('link', { name: " Products"}).click();
    await expect(page).toHaveURL("https://automationexercise.com/products");
    await expect(page).toHaveTitle("Automation Exercise - All Products");
    await expect(page.getByRole('heading', { name: "All Products"})).toBeVisible();
    await expect(page.locator('[class="features_items"]')).toBeVisible()

    const productsList = page.locator('[class="product-image-wrapper"]');
    const productsCount = await productsList.count();
    expect(productsCount).toBeGreaterThan(0);

    const productNum = 1;
    const firstProduct = productsList.nth(productNum-1);
    await firstProduct.getByRole('link', { name: "View Product"}).click();
    await expect(page).toHaveURL(`https://automationexercise.com/product_details/${productNum}`);
    await expect(page).toHaveTitle("Automation Exercise - Product Details");
    await expect(page.locator('[class="product-information"]')).toBeVisible();

    // -- Increase quantity to 4
    const quantity = '4';
    const quantityBox = page.locator('[id="quantity"]');
    await quantityBox.clear();
    await quantityBox.fill(quantity);

    // -- Click Add to cart button
    await page.getByRole('button', { name: "Add to cart"}).click();
    await expect(page.locator('[class="modal-content"]')).toBeVisible();
    await expect(page.locator('[class="text-center"]', { hasText: "Your product has been added to cart."})).toBeVisible();

    // -- Click View Cart button
    await page.locator('a', { hasText: "View Cart"}).click()
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
    await expect(page).toHaveTitle("Automation Exercise - Checkout");

    const cartInfo = page.locator('[id="cart_info"]');
    await expect(cartInfo).toBeVisible();
    const itemsRow = cartInfo.locator('tbody tr');
    const itemsCount = await itemsRow.count()
    expect(itemsCount).toBeGreaterThan(0);

    const itemQuantity = await itemsRow.nth(0).locator('[class="cart_quantity"]').innerText();
    expect(itemQuantity).toBe(quantity);

})