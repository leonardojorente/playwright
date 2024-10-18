import { expect } from '@playwright/test';
import  TestData  from '../../data/test-data.json';
import { test } from '../fixtures/pages-fixture';
import { generateRandomString } from '../../support/utils';

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.BASE_URL_WEB!);
});

test('TC01 Add New Account', {tag: ['@regression']},  async ({ topMenuComponent, accountPage }) => {
  const randomAccountName = `accountName ${generateRandomString(3)}`
  
  await topMenuComponent.clickSettingsOption(TestData.TOP_MENU_COMPONENT.SETTINGS_OPTION_ACCOUNTS);
  await accountPage.insertAccountName(randomAccountName);
  await accountPage.clickSaveAccountButton();

  // Expect account row to be added
  await expect(accountPage.accountRowByAccountName(randomAccountName)).toBeVisible();
});
