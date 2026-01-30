import { expect } from "@playwright/test";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class HomePage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.homeButton = this.page.getByRole('link', { name: "Home"});
        this.productButton = this.page.getByRole('link', { name: "Products"});
        this.cartButton = this.page.getByRole('link', { name: "Cart"});
        this.signAndLoginButton = this.page.getByRole('link', { name: "Signup / Login"});
        this.testCasesButton = this.page.getByRole('link', { name: "Test Cases"});
        this.apiTestingButton = this.page.getByRole('link', { name: "API Testing"});
        this.contactUsButton = this.page.getByRole('link', { name: "Contact us"});
        this.leftSideBar = this.page.locator('[class="left-sidebar"]');
        this.featuresItems = this.page.locator('[class="features_items"]');
        this.newUserSignupHeading = this.page.getByRole('heading', { name: "New User Signup!" });
        this.loginHeading = this.page.getByRole('heading', { name: "Login to your account" }); 
    }

    async launchHomePage() {
        await this.page.goto('https://automationexercise.com', { waitUntil: 'domcontentloaded' });
    }

    async clickHome(){
        await this.homeButton.click();
    }

    async verifyHomepage(){
        await expect(this.page).toHaveTitle('Automation Exercise');
        await expect(this.page).toHaveURL("https://automationexercise.com");
        await expect(this.leftSideBar).toBeVisible();
        await expect(this.featuresItems).toBeVisible();
    }

    async clickProduct(){
        await this.productButton.click();
    }

    async verifyProductPage(){
        await expect(this.page).toHaveTitle('Automation Exercise - All Products');
        await expect(this.page).toHaveURL("https://automationexercise.com/products");
    }

    async clickCart(){
        await this.cartButton.click();
    }

    async verifyCartPage(){
        await expect(this.page).toHaveTitle('Automation Exercise - Checkout');
        await expect(this.page).toHaveURL("https://automationexercise.com/view_cart");
    }

    async clickSignUpAndLogin(){
        await this.signAndLoginButton.click();
    }

    async verifySignUpAndLoginPage(){
        await expect(this.page).toHaveTitle('Automation Exercise - Signup / Login');
        await expect(this.page).toHaveURL("https://automationexercise.com/login");
        await expect(this.newUserSignupHeading).toBeVisible();
        await expect(this.loginHeading).toBeVisible();
    }

    async clickTestCases(){
        await this.testCasesButton.click();
    }

    async verifyTestCasesPage(){
        await expect(this.page).toHaveTitle('Automation Practice Website for UI Testing - Test Cases');
        await expect(this.page).toHaveURL("https://automationexercise.com/test_cases");
    }

    async clickAPITesting(){
        await this.apiTestingButton.click();
        await expect(this.page).toHaveTitle('Automation Practice Website for API Testing');
        await expect(this.page).toHaveURL("https://automationexercise.com/api_list");
    }

    async verifyAPITestingPage(){
        await expect(this.page).toHaveTitle('Automation Practice Website for API Testing');
        await expect(this.page).toHaveURL("https://automationexercise.com/api_list");
    }

    async clickContactUs(){
        await this.contactUsButton.click();
    }

    // async verifyContactUsPage(){
    //     await expect(this.page).toHaveTitle('Automation Exercise - Contact Us');
    //     await expect(this.page).toHaveURL("https://automationexercise.com/contact_us");
    // }
   
}