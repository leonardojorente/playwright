import { test as setup, expect } from '../../ui/fixtures/pages-fixture';
import  TestData  from '../../data/test-data.json';

//adm user
const userName = process.env.USER!
const password = process.env.PASSWORD!
const adminFile = '.auth/admin.json';

//comun user
const userNameAdm = process.env.USER!
const passwordAdm = process.env.PASSWORD!
const userFile = '.auth/user.json';

setup('authenticate as admin', async ({ page, loginPage, toastComponent }) => {
    await page.goto(process.env.BASE_URL_WEB!);
    await loginPage.loginWebApp(userNameAdm, passwordAdm);
  
    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(TestData.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();

    await page.context().storageState({ path: adminFile });
});

setup('authenticate as user', async ({ page, loginPage, toastComponent }) => {
    await page.goto(process.env.BASE_URL_WEB!);
    await loginPage.loginWebApp(userName, password);
  
    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(TestData.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();

    await page.context().storageState({ path: userFile });
});