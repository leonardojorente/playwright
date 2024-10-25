import { test as setup, expect } from '../../ui/fixtures/pages-fixture';
import  TestData  from '../../data/test-data.json';

//comun user
const userName = process.env.USER!
const password = process.env.PASSWORD!
const baserUrl = process.env.BASE_URL_WEB!
const userFile = '.auth/user.json';

setup('authenticate as user', async ({ page, loginPage, toastComponent }) => {
    await page.goto(baserUrl);
    await loginPage.loginWebApp(userName, password);
  
    // Expect a toast to have the message
    await expect(toastComponent.toastMessage(TestData.TOAST_COMPONENT.LOGIN_MESSAGE)).toBeVisible();

    await page.context().storageState({ path: userFile });
});