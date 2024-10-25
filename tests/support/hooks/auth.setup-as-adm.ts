import { test as setup, expect } from '../../ui/fixtures/pages-fixture';
import  TestData  from '../../data/test-data.json';

//adm user
const userNameAdm = process.env.USER!
const passwordAdm = process.env.PASSWORD!
const adminFile = '.auth/admin.json';

setup('authenticate as admin', async ({ page, loginPage, toastComponent }) => {
    await page.goto('/');
    await loginPage.loginWebApp(userNameAdm, passwordAdm);
  
    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(TestData.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();

    await page.context().storageState({ path: adminFile });
});