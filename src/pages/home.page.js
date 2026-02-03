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
        this.testCasesButton = this.page.getByRole('link', { name: 'Test Cases', exact: true });
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

    async verifyHomepageIsLoaded(){
        await expect(this.page).toHaveTitle('Automation Exercise');
        await expect(this.page).toHaveURL("https://automationexercise.com");
        await expect(this.leftSideBar).toBeVisible();
        await expect(this.featuresItems).toBeVisible();
    }

    async clickProduct(){
        await this.productButton.click();
    }

    async clickCart(){
        await this.cartButton.click();
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

    async clickAPITesting(){
        await this.apiTestingButton.click();
        await expect(this.page).toHaveTitle('Automation Practice Website for API Testing');
        await expect(this.page).toHaveURL("https://automationexercise.com/api_list");
    }

    async clickContactUs(){
        await this.contactUsButton.click();
    }
   
}