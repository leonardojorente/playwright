import { expect } from '@playwright/test';
import  TestData  from '../../data/test-data.json';
import { test } from '../fixtures/pages-fixture';

const userName = process.env.USER!
const password = process.env.PASSWORD!

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(3000);
});

test('TC01 Success Login', {tag: ['@regression', '@smoke']},  async ({ loginPage, toastComponent }) => {
  
  await loginPage.insertEmail(userName)
  await loginPage.insertPassword(password)
  await loginPage.clickSignInButton()
console.log(1000)

  // Expect a toast to have the message
  await expect(toastComponent.toastMessage(TestData.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();
});

test('TC02 Success Logout', {tag: '@regression'}, async ({ loginPage, toastComponent, topMenuComponent }) => {
  await loginPage.loginWebApp(userName, password);
  await topMenuComponent.clickSettingsOption(TestData.TOP_MENU_COMPONENT.SETTINGS_OPTION_LOGOUT);

  // Expect a toast to have the message
  await expect(toastComponent.toastMessage(TestData.TOAST_COMPONENT.LOGOUT_MESSAGE)).toBeVisible();
});

test('TC03 Fail Login', {tag: ['@regression', '@smoke', '@error']},  async ({ loginPage, toastComponent }) => {
  await loginPage.insertEmail(`ERROR${userName}`)
  await loginPage.insertPassword(password)
  await loginPage.clickSignInButton()

  // Expect a toast to have the message
  await expect(toastComponent.toastMessage(TestData.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();
});
