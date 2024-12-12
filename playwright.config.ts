import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';

//set .env path
const dotEnvPath = process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env'
// Read from ".env" file.
dotenv.config({ 
  path: path.resolve(__dirname, dotEnvPath),
  override:true 
});

export const STORAGE_STATE_ADM = path.join(__dirname, '.auth/admin.json');
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
    /******************API environment setup*********************************/
    {
      name: 'setupApi',
      testMatch: '**/*.setup-by-api.ts',
      use: {       
        ...devices['Desktop Chrome']
      },
      teardown: 'teardownApi'
    },
    {
      name: 'teardownApi',
      testMatch: '**/*.teardown\.ts',
    },
    {
      name: 'apiTests',
      dependencies: ['setupApi'],
      use: { 
        ...devices['Desktop Chrome'],
        screenshot:'only-on-failure', 
        headless: true,
        trace: 'retain-on-first-failure'    
      }
    },
    /******************Administration environment setup*********************************/
    {
      name: 'setupAdmEnv',
      testMatch: '**/*.setup-as-adm.ts',
      use: {       
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL_WEB_ADM!
      }
    },
    {
      name: 'e2eTestsAsAdm',
      dependencies: ['setupAdmEnv', 'setupApi'],
      use: {       
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL_WEB_ADM!,
        screenshot:'only-on-failure', 
        //locale: 'it-IT', //it will effect navigator.language value, Accept-Language request header value
        headless: true,
        trace: 'retain-on-first-failure',
        launchOptions: {
          logger: {
            isEnabled: (name, severity) => name === 'api',
            log: (name, severity, message, args) => {
              const severityThreshold = 'info'; // Example threshold to print info, warning and error
              const severityLevels = ['verbose', 'info', 'warning', 'error'];
              if (severityLevels.indexOf(severity) >= severityLevels.indexOf(severityThreshold)) { 
                  console.log(`[${name}: ${severity}] ${message}`);
              }
            }
          }
        },  
        storageState: STORAGE_STATE_ADM      
      }
    },
    {
      name: 'simpleProject',
      use: {       
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL_WEB_ADM!,
        screenshot:'only-on-failure', 
        //locale: 'it-IT', //it will effect navigator.language value, Accept-Language request header value
        headless: true,
        trace: 'retain-on-first-failure',
      }
      
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
