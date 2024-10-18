import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { AccountPage } from '../pages/account-page';
import { ToastComponent } from '../pages/components/toast-component';
import { TopMenuComponent } from '../pages/components/top-menu-component';

type PagesFixtures = {
  loginPage: LoginPage;
  appLogin: LoginPage;
  accountPage: AccountPage;
  toastComponent: ToastComponent;
  topMenuComponent: TopMenuComponent;
}

export const test = base.extend<PagesFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  appLogin: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  toastComponent: async ({ page }, use) => {
    await use(new ToastComponent(page));
  },
  topMenuComponent: async ({ page }, use) => {
    await use(new TopMenuComponent(page));
  }
});

export { expect } from '@playwright/test';