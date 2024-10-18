import { test, expect } from '@playwright/test';
import  LoginPayload  from '../../data/request-payloads/post-signin-payload.json';
import { LoginRequests } from '../api-requests/login-requests';
import Ajv from 'ajv';

LoginPayload.email = process.env.USER!;
LoginPayload.senha = process.env.PASSWORD!;

test.describe('Login API Tests', () => {

  test('TC01 Success Login by API', {tag: ['@regression', '@api']},  async ({ request }) => {
    const loginRequests = new LoginRequests(request)

    const response = await loginRequests.doLogin(LoginPayload)
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.nome).toBe("leonardo Jorente");
  });

  test('TC02 Login Schema Validation', {tag: ['@regression', '@api', '@schema']},  async ({ request }) => {
    //Website to generate json schema, based on the current response of the request
    //https://json-to-schema.itential.io/
    // Initialise AJV, plugin used to check json schema
    const ajv = new Ajv();
    const loginRequests = new LoginRequests(request)

    const response = await loginRequests.doLogin(LoginPayload)

      expect(response.status()).toBe(200);
      const responseBody = await response.json();
	    // Validate the response against the schema file
      const isValid = ajv.validate(require('../../data/JSON-schemas/login-schema.json'), responseBody);
	    // Output the errors text
      if (!isValid) {
        console.error('AJV Validation Errors:', ajv.errorsText());
      }

      // If the JSON is valid, the variable is "true"
      expect(isValid).toBe(true);
  });
});
