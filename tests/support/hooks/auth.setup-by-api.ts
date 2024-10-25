import { test as setup, expect } from '../../ui/fixtures/pages-fixture';
import  LoginPayload  from '../../data/request-payloads/post-signin-payload.json';
import { LoginRequests } from '../../api/api-requests/login-requests';

//adm user
LoginPayload.email = process.env.USER!;
LoginPayload.senha = process.env.PASSWORD!;

setup('authenticate as admin by API', async ({ request }) => {
    const loginRequests = new LoginRequests(request)
    const response = await loginRequests.doLogin(LoginPayload)

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    process.env.API_TOKEN = responseBody.token
});