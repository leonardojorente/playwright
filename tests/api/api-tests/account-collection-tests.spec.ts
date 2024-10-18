import { test, expect } from '@playwright/test';
import { generateRandomString } from '../../support/utils';
import  AccountPayload  from '../../data/request-payloads/post-contas-payload.json';
import { AccountRequests } from '../api-requests/account-requests';

test('TC01 Create new account by API', {tag: ['@regression', '@api']},  async ({ request }) => {
  AccountPayload.nome = `account${generateRandomString(3)}`;

  const accountRequests = new AccountRequests(request)
  const response = await accountRequests.createNewAccount(AccountPayload)
  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  expect(responseBody.nome).toBe(AccountPayload.nome);
});