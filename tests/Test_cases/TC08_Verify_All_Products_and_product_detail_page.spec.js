import { expect, test } from "@playwright/test";

test('TC08: Verify All Products and product detail page @tc8 @regression', async ({ page }) => {
    await page.goto("https://automationexercise.com", { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    await page.getByRole('link', { name: 'Products' }).click()
    await expect(page).toHaveURL("https://automationexercise.com/products");
    await expect(page).toHaveTitle("Automation Exercise - All Products");
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible()
    await expect(page.locator('[class="features_items"]')).toBeVisible();

    const productsList = page.locator('[class="col-sm-4"]');
    const count = await productsList.count();
    expect(count).toBeGreaterThan(0);
    
    await productsList.nth(1).getByRole('link', { name: "View Product"}).click()

    await expect(page).toHaveURL('https://automationexercise.com/product_details/1')

    const productInfo = page.locator('[class="product-information"]')
    await expect(productInfo).toBeVisible()
    
    await expect(productInfo.locator('h2')).toHaveText('Blue Top');

    await expect(productInfo.locator('p', { hasText: "Category: Women > Tops"})).toBeVisible()

    await expect(productInfo.locator('span span')).toHaveText("Rs. 500");

    await expect(productInfo.locator('p', { hasText: "Availability"})).toBeVisible()

    await expect(productInfo.locator('p', { hasText: "Condition"})).toBeVisible()

    await expect(productInfo.locator('p', { hasText: "Brand"})).toBeVisible()
})