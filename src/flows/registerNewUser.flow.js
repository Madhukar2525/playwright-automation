import { expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { RegisterPage } from "../pages/register.page";
import { AuthPage } from "../pages/auth.page";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class RegisterNewUserFlow{
    /**
     * @param {Page} page
     */
    constructor(page){
        this.homepage = new HomePage(page);
        this.registerpage = new RegisterPage(page);
        this.authpage = new AuthPage(page);
    }

    async registerNewUser(user){
        await this.homepage.clickSignUpAndLogin();
        await this.homepage.verifySignUpAndLoginPage()
        await this.registerpage.beginRegistration(user.fullName, user.emailId);
        await this.registerpage.verifySignupPageIsLoaded();
        await this.registerpage.fillAccountInformation(user.title, user.password, user.dob.day, user.dob.month, user.dob.year);
        await this.registerpage.subscribeToNewsletterAndOffers(true, true);
        await this.registerpage.fillAddressInformation(user.firstName, user.lastName, user.company, user.address, user.address2, user.country, user.state, user.city, user.zipcode, user.mobile);
        await this.registerpage.clickCreateAccountButton();
        await this.authpage.verifyAccountCreatedPageIsLoaded();
        await this.authpage.clickContinueButton();
        await this.authpage.verifyUserIsLoggedIn(user.fullName);
    }
}