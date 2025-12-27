import { test, expect } from '@playwright/test';

test("Select value from the dropdown menu @p1", async({page}) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.waitForTimeout(3000)
    // await page.getByRole('combobox', { name: "Country"}).click()
    await page.getByRole('combobox', { name: 'Country'}).selectOption('Japan');

    await expect(page.getByRole('combobox', { name: 'Country'})).toHaveValue('japan')

    await page.waitForTimeout(4000)
})