/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class Action {
    /**
     * @param {Page} page
     */
    constructor(page){
        this.page = page;
    }

    async open(url){
        await this.page.goto(url);
    }

    async reloadPage(){
        await this.page.reload();
    }

    async goBack(){
        await this.page.goBack();
    }

    async goForward(){
        await this.page.goForward();
    }

    async scrollTo(selector){
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

}