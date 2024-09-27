import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { TopMenuComponent } from '../pages/components/top-menu-component';

test('TC01 Success Login', {tag: ['@regression', '@smoke']},  async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://barrigareact.wcaquino.me/');
  await loginPage.insertEmail('cypresstest@gmail.com')
  await loginPage.insertPassword('cypress')
  await loginPage.clickSignInButton()

  // Expect a toast to have the message
  await expect(page.getByText('Bem vindo, leonardo Jorente!', { exact: true })).toBeVisible();
});

test('TC02 Success Logout', {tag: '@regression'}, async ({ page }) => {
  const loginPage = new LoginPage(page);
  const topMenuComponent = new TopMenuComponent(page);
  await page.goto('https://barrigareact.wcaquino.me/');
  await loginPage.loginWebApp('cypresstest@gmail.com', 'cypress');
  await topMenuComponent.clickSettingsOption("Sair");

  // Expect a toast to have the message
  await expect(page.getByText('Até Logo!', { exact: true })).toBeVisible();
});
