import { expect } from '@playwright/test';
import { test } from '../fixtures/pages-fixture';



test('TC01 Switch .env test', {tag: ['@regression', '@smoke']},  async () => {
  
  const userName = process.env.USER!
  const password = process.env.PASSWORD!
  const baserUrl = process.env.BASE_URL_WEB!

console.log(`userName: ${userName}`)
console.log(`password: ${password}`)
console.log(`baserUrl: ${baserUrl}`)

await expect('true').toContain('tr');

});


