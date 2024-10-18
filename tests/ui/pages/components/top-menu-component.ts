import { type Locator, type Page } from '@playwright/test';

export class TopMenuComponent{
    readonly page: Page;
    readonly settingsBtn: Locator;
    readonly settingsMenu: Locator;
    readonly settingsDropDownOption: (settingsOption: string) => Locator;

    constructor(page: Page) {
        this.settingsBtn = page.getByTitle('settings');
        this.settingsDropDownOption = (settingsOption: string) => page.locator('div[class*="dropdown-menu"]').getByText(`${settingsOption}`, { exact: true });
    }

    /**
    * @param settingsOption -> "Contas", "Resetar", "Sair" 
    */
    async clickSettingsOption(settingsOption: string){
        await this.settingsBtn.click();
        await this.settingsDropDownOption(settingsOption).click()
    }
}