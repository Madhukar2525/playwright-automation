import { expect, test } from "@playwright/test";

test('TC09: Search Product @tc9 @regression', async({ page }) => {
    await page.goto("https://automationexercise.com", { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");

    await page.getByRole('link', { name: 'Products'}).click()

    await expect(page).toHaveURL("https://automationexercise.com/products");
    await expect(page).toHaveTitle("Automation Exercise - All Products");
    await expect(page.getByRole('heading',{ name: 'All Products'})).toBeVisible();
    await expect(page.locator('[class="features_items"]')).toBeVisible()

    const productsList = page.locator('[class="productinfo text-center"]');
    const productsCount = await productsList.count();
    console.log("total products count is: ", productsCount)
    expect(productsCount).toBeGreaterThan(0);

    const searchText = "blue".toLowerCase()
    await page.locator('[id="search_product"]').fill(searchText);
    await page.locator('[id="submit_search"]').click();

    await expect(page).toHaveURL(`https://automationexercise.com/products?search=${searchText}`);
    await expect(page.getByRole('heading', { name: "Searched Products"})).toBeVisible();

    const searchedProductsList = page.locator('[class="productinfo text-center"]');
    const sPCount = await searchedProductsList.count();
    console.log("total products count is: ", sPCount)
    expect(sPCount).toBeGreaterThan(0);

    for (let i=0; i<sPCount; i++){
        const productName = (await searchedProductsList.nth(i).locator('p').innerText()).toLowerCase();
        console.log(`Product name of ${i+1} is: `, productName);
        expect.soft(productName).toContain(searchText)
    }
})