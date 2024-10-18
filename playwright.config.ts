import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';

// Read from ".env" file.
dotenv.config({ 
  path: path.resolve(__dirname, '.env'),
  override:true 
});

export const STORAGE_STATE = path.join(__dirname, '.auth/user.json');
export default defineConfig({
  globalSetup: require.resolve('./tests/support/global-setup.ts'),
  globalTeardown: require.resolve('./tests/support/global-teardown.ts'),
  
  //testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-first-failure',
    screenshot:'only-on-failure',
    headless: true
    
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
      use: {       
        ...devices['Desktop Chrome']
      }
    },
    {
      name: 'setupAPI',
      testMatch: '**/*.setupByAPI.ts',
      use: {       
        ...devices['Desktop Chrome']
      },
      teardown: 'teardownAPI'
    },
    {
      name: 'teardownAPI',
      testMatch: '**/*.teardown\.ts',
    },
    {
      name: 'APITests',
      dependencies: ['setupAPI'],
      use: { 
        ...devices['Desktop Chrome'],
        screenshot:'only-on-failure', 
        headless: false,
        trace: 'retain-on-first-failure'      }
    },

    {
      name: 'E2ETests',
      dependencies: ['setup', 'setupAPI'],
      use: {       
        ...devices['Desktop Chrome'],
        screenshot:'only-on-failure', 
        headless: false,
        trace: 'retain-on-first-failure',
        storageState: STORAGE_STATE      }
    }

   

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
