import { test, expect } from '@playwright/test';
async function globalSetup(page) {

  console.log(`works as before all hook, only one function, a place to set process.env values`)

}

export default globalSetup;

