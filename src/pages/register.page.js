import { expect } from "@playwright/test";
/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class RegisterPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.signupName = this.page.locator('[data-qa="signup-name"]');
        this.signupEmail = this.page.locator('[data-qa="signup-email"]');
        this.signupButton = this.page.locator('[data-qa="signup-button"]');
        this.newsletterCheckbox = this.page.locator('[id="newsletter"]');
        this.offersCheckbox = this.page.locator('[id="optin"]');
        this.signupErrorMessage = this.page.getByText('Email Address already exist!');

        // Account Information selectors
        this.titleRadioButton = (title) => this.page.locator(`input[name="title"][value="${title}"]`);
        this.passwordTextbox = this.page.locator('[data-qa="password"]');
        this.daysDropDown = this.page.locator('[data-qa="days"]');
        this.monthsDropDown = this.page.locator('[data-qa="months"]');
        this.yearsDropDown = this.page.locator('[data-qa="years"]');

        // Address Information selectors
        this.firstNameTextbox = this.page.locator('[data-qa="first_name"]');
        this.lastNameTextbox = this.page.locator('[data-qa="last_name"]');
        this.companyTextbox = this.page.locator('[data-qa="company"]');
        this.addressTextbox = this.page.locator('[data-qa="address"]');
        this.address2Textbox = this.page.locator('[data-qa="address2"]');
        this.countryDropDown = this.page.locator('[data-qa="country"]');
        this.stateTextbox = this.page.locator('[data-qa="state"]');
        this.cityTextbox = this.page.locator('[data-qa="city"]');
        this.zipcodeTextbox = this.page.locator('[data-qa="zipcode"]');
        this.mobileNumberTextbox = this.page.locator('[data-qa="mobile_number"]');

        // Buttons
        this.createAccountButton =  this.page.locator('[data-qa="create-account"]');

    }

    async beginRegistration(fullName, emailId) {
        await this.signupName.fill(fullName);
        await this.signupEmail.fill(emailId);
        await this.signupButton.click();
    }

    /**
     * Subscribe to newsletter and/or promotional offers
     * @param {boolean} subscribeNewsletter - true to check newsletter
     * @param {boolean} subscribeOffers - true to check offers/opt-in
     */
    async subscribeToNewsletterAndOffers(subscribeNewsletter = false, subscribeOffers = false) {
        if (subscribeNewsletter) {
            await this.newsletterCheckbox.check();
            await expect(this.newsletterCheckbox).toBeChecked();
        } else {
            await this.newsletterCheckbox.uncheck();
            await expect(this.newsletterCheckbox).not.toBeChecked();
        }

        if (subscribeOffers) {
            await this.offersCheckbox.check();
            await expect(this.offersCheckbox).toBeChecked();
        } else {
            await this.offersCheckbox.uncheck();
            await expect(this.offersCheckbox).not.toBeChecked();
        }
    }


    async verifySignupPageIsLoaded() {
        await expect(this.page).toHaveTitle('Automation Exercise - Signup');
        await expect(this.page).toHaveURL("https://automationexercise.com/signup");
        await expect(this.page.getByRole('heading', { name: "Enter Account Information" })).toBeVisible()
    }

    async fillAccountInformation(title, password, day, month, year, ){
        await this.titleRadioButton(title).click();
        await expect(this.titleRadioButton(title)).toBeChecked();

        await this.passwordTextbox.fill(password);

        await this.daysDropDown.selectOption(day);
        await expect(this.daysDropDown).toHaveValue(day)

        await this.monthsDropDown.selectOption(month);
        await expect(this.monthsDropDown).toHaveValue(month);
        
        await this.yearsDropDown.selectOption(year);
        await expect(this.yearsDropDown).toHaveValue(year)
    }

    async fillAddressInformation(firstName, lastName, company, address, address2, country, state, city, zipcode, mobile){
        await this.firstNameTextbox.fill(firstName);
        await this.lastNameTextbox.fill(lastName);
        await this.companyTextbox.fill(company);
        await this.addressTextbox.fill(address);
        await this.address2Textbox.fill(address2);
        await this.countryDropDown.selectOption(country);
        await expect(this.countryDropDown).toHaveValue(country)
        await this.stateTextbox.fill(state);
        await this.cityTextbox.fill(city);
        await this.zipcodeTextbox.fill(zipcode);
        await this.mobileNumberTextbox.fill(mobile);
    }

    async clickCreateAccountButton(){
        await this.createAccountButton.click();
    }

    async verifyExistingEmailErrorMessage(){
        await expect(this.signupErrorMessage).toBeVisible();
    }

}