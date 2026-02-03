import { test, expect } from "@playwright/test";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class CartPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.cartRows = page.locator('[id="cart_info_table"]').locator('tbody').locator('tr');
    }

    async verifyCartPageIsLoaded() {
        await expect(this.page).toHaveURL("https://automationexercise.com/view_cart");
        await expect(this.page).toHaveTitle("Automation Exercise - Checkout");
    }

    async getCartProductCount() {
        return await this.cartRows.count();
    }

    async verifyCartItemDetailsByIndex(index, { price, quantity }) {
        await test.step(`Verify cart item ${index} details`, async () => {
            const item = this.cartRows.nth(index - 1);
            const priceText = await item.locator('[class="cart_price"]').innerText();
            const quantityText = await item.locator('[class="cart_quantity"]').innerText();
            const totalText = await item.locator('[class="cart_total"]').innerText();
            // console.log("deatils are: ", priceText, quantityText, totalText)

            const actualPrice = Number(priceText.replace("Rs. ", ""));
            const actualQuantity = Number(quantityText);
            const actualTotal = Number(totalText.replace("Rs. ", ""));

            expect(actualPrice).toBe(price);
            expect(actualQuantity).toBe(quantity);
            expect(actualTotal).toBe(price * quantity);
        });
    }
}