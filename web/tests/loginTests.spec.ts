import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TopMenuComponent } from '../pages/components/top-menu-component';


test('TC01 Success Login @smoke @regression', {tag: ['@regression', '@smoke']},  async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://barrigareact.wcaquino.me/');
  console.log(process.env.ENV)
  await loginPage.insertEmail(process.env.USER)
  await loginPage.insertPassword(process.env.PASSWORD)
  await loginPage.clickSignInButton()

  // Expect a toast to have the message
  await expect(page.getByText('Bem vindo, leonardo Jorente!', { exact: true })).toBeVisible();
});

test('TC02 Success Logout', {tag: '@regression'}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const topMenuComponent = new TopMenuComponent(page);
  await page.goto('https://barrigareact.wcaquino.me/');
  await loginPage.loginWebApp(process.env.USER, process.env.PASSWORD);
  await topMenuComponent.clickSettingsOption("Sair");

  // Expect a toast to have the message
  await expect(page.getByText('Até Logo!', { exact: true })).toBeVisible();
});
