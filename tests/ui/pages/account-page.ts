import { type Locator, type Page } from '@playwright/test';

export class AccountPage{
    readonly page: Page;
    readonly accountNameInput: Locator;
    readonly saveAccountButton: Locator;
    readonly accountRowByAccountName: (accountName: string) => Locator;

    constructor(page: Page) {
        this.accountNameInput = page.locator('input[data-test="nome"]');
        this.saveAccountButton = page.locator('button[alt="Salvar"]');
        this.accountRowByAccountName = (accountName: string) => page.locator(`xpath=//table[@class='table']//tbody//td[contains(text(),'${accountName}')]`);
    }

    async insertAccountName(acountName: string){
        await this.accountNameInput.clear()
        await this.accountNameInput.fill(acountName);
    }

    async clickSaveAccountButton(){
        await this.saveAccountButton.click();
    }
}