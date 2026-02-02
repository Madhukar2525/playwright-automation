import { expect, test } from '@playwright/test';

test('practice iframe @p06', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const iframeElement = page.frameLocator('[id="courses-iframe"]');
    await iframeElement.getByRole('link', { name: "Practice"}).click();
    
    await page.waitForTimeout(3000);
})