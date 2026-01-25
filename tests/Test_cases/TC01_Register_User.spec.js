import { test, expect } from '@playwright/test';

const firstName = "Steve2";
const lastName = "Irwin2";
const emailId = `${firstName}.${lastName}@gmail.com`
const fullName = `${firstName} ${lastName}`
const password = `${firstName}@123`

test('TC01: Register User @tc1 @smoke @regression', async({page}) => {
    await page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded'});
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page).toHaveURL("https://automationexercise.com");

    await page.locator('text=Signup / Login').click();
    await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    await expect(page).toHaveURL("https://automationexercise.com/login");
    await expect(page.locator('text=New User Signup!')).toBeVisible();

    await page.locator('[data-qa="signup-name"]').fill(fullName);

    await page.locator('[data-qa="signup-email"]').fill(emailId);
    
    await page.locator('[data-qa="signup-button"]').click();
    await expect(page).toHaveTitle('Automation Exercise - Signup');
    await expect(page).toHaveURL("https://automationexercise.com/signup");

    await page.locator('input[type=radio][value="Mr"]').check();
    await expect(page.locator('input[type=radio][value="Mr"]')).toBeChecked()

    await page.locator('[data-qa="password"]').fill(password);

    await page.locator('[data-qa="days"]').selectOption('1');
    await expect(page.locator('[data-qa="days"] option:checked')).toHaveText('1')

    await page.locator('[data-qa="months"]').selectOption("December");
    await expect(page.locator('[data-qa="months"] option:checked')).toHaveText('December');

    await page.locator('[data-qa="years"]').selectOption('1998');
    await expect(page.locator('[data-qa="years"] option:checked')).toHaveText('1998');

    // await page.getByRole('checkbox', {name: 'Sign up for our newsletter!'}).check();
    // await expect(page.getByRole('checkbox', {name: 'Sign up for our newsletter!'})).toBeChecked();
    await page.locator('input[type="checkbox"][name="newsletter"]').check();
    await expect(page.locator('input[type="checkbox"][name="newsletter"]')).toBeChecked()

    // await page.getByRole('checkbox', {name: "Receive special offers from our partners!"}).check();
    // await expect(page.getByRole('checkbox', {name: "Receive special offers from our partners!"})).toBeChecked();
    await page.locator('input[type="checkbox"][name="optin"]').check();
    await expect(page.locator('input[type="checkbox"][name="optin"]')).toBeChecked();

    await page.locator('[data-qa="first_name"]').fill(firstName);

    await page.locator('[data-qa="last_name"]').fill(lastName);

    await page.locator('[data-qa="company"]').fill('Amazon');

    await page.locator('[data-qa="address"]').fill('1/10, Apple street, ');

    await page.locator('[data-qa="address2"]').fill('Opp. Cinema hall');

    await page.locator('[data-qa="country"]').selectOption('India');
    await expect(page.locator('[data-qa="country"] option:checked')).toHaveText('India')

    await page.locator('[data-qa="state"]').fill('Maharashtra');

    await page.locator('[data-qa="city"]').fill('Mumbai');

    await page.locator('[data-qa="zipcode"]').fill('400001');

    await page.locator('[data-qa="mobile_number"]').fill('9876543210');

    await page.locator('[data-qa="create-account"]').click()

    await expect(page).toHaveTitle('Automation Exercise - Account Created');
    await expect(page).toHaveURL("https://automationexercise.com/account_created");

    await expect(page.locator('text="Account Created!"')).toBeVisible()

    await page.locator('[data-qa="continue-button"]').click()

    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");
    await expect(page.locator(`text=Logged in as ${fullName}`)).toBeVisible();

    await page.locator('text=" Delete Account "').click();
    await expect(page).toHaveTitle('Automation Exercise - Account Created');
    await expect(page).toHaveURL("https://automationexercise.com/delete_account");

    await expect(page.locator('text="Account Deleted!"')).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click()
    await expect(page).toHaveURL("https://automationexercise.com");
    await expect(page).toHaveTitle("Automation Exercise");
});