import { type Locator, type Page } from '@playwright/test';

export class LoginPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.emailInput = page.locator('input[data-test="email"]');
        this.passwordInput = page.locator('xpath=//input[@data-test="passwd"]');
        this.loginBtn = page.getByRole('button', {name: 'Entrar'});
    }

    async insertEmail(email){
        await this.emailInput.fill(email);
    }

    async insertPassword(password){
        await this.passwordInput.fill(password);
    }

    async clickSignInButton(){
        await this.loginBtn.click();
    }

    async loginWebApp(email, password){
        await this.insertEmail(email)
        await this.insertPassword(password)
        await this.clickSignInButton()
    }
}