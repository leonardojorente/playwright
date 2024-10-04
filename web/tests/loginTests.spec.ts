import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TopMenuComponent } from '../pages/components/top-menu-component';

const username = process.env.USER!
const password = process.env.PASSWORD!
test('TC01 Success Login @smoke @regression', {tag: ['@regression', '@smoke']},  async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://barrigareact.wcaquino.me/');
  await loginPage.insertEmail(username)
  await loginPage.insertPassword(password)
  await loginPage.clickSignInButton()

  // Expect a toast to have the message
  await expect(page.getByText('Bem vindo, leonardo Jorente!', { exact: true })).toBeVisible();
});

test('TC02 Success Logout', {tag: '@regression'}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const topMenuComponent = new TopMenuComponent(page);
  await page.goto('https://barrigareact.wcaquino.me/');
  await loginPage.loginWebApp(username, password);
  await topMenuComponent.clickSettingsOption("Sair");

  // Expect a toast to have the message
  await expect(page.getByText('Até Logo!', { exact: true })).toBeVisible();
});
