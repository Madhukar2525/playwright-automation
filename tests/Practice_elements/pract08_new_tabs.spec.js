import { test, expect } from "@playwright/test";

test("Test opening new tab", {tag: ['@nt01']}, async({page}) => {
    await page.goto('https://www.qa-practice.com/');

    await page.getByRole('link', {name: "Single UI Elements"}).click();

    await page.getByRole('link', {name: "New tab"}).click();

    await expect(page).toHaveURL("https://www.qa-practice.com/elements/new_tab/link");

    const newTabLink = page.getByRole('link', {name: "New tab link"});

    await newTabLink.hover();

    const newTabPromise = page.waitForEvent('download')
    await newTabLink.click();

    await page.waitForTimeout(3000)
})