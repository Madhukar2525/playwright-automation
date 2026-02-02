import { test, expect } from '@playwright/test';

test("Perform drag and drop @p07", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    
    // await page.getByText('Drag and Drop').scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 1500);

    const source = page.locator('#draggable');
    const target = page.locator('#droppable');
    await page.waitForTimeout(3000)
    await expect(target.locator('p')).toHaveText('Drop here');

    await source.dragTo(target);
    await expect(target.locator('p')).toHaveText('Dropped!');

    await page.waitForTimeout(3000)
})