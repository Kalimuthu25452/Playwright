const { test, expect } = require("@playwright/test");
// import {test, expect}  from  '@playwright/test'
const {loginPage} = require("../tests/login")

// Custom flag to control beforeAll and afterAll execution
const runSetupAndTeardown = false; // Set to `true` if you want these hooks to run

// INPUTS
const url = "https://test.salesforce.com/";
const loginInPageTitle = "Login | Salesforce";
const ip_username = "kalimuthu25452@gmail.com";
const ip_password = "Kali$Muthu25452";
var traceLocation = "test-results\\login-trace.zip";

// Global Variable declarations
let context;
let page;

test.describe("Login into Org", () => {
  // BEFORE ALL
  test.beforeAll(async ({ browser }) => {
    if (runSetupAndTeardown) {
      context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }, // This will maximize the browser window
      });

      await context.tracing.start({
        screenshots: true, // Takes screenshot
        snapshots: true, // Takes snaps of each actions
      });

      page = await context.newPage();
    }
  });

  // BEFORE EACH
  test.beforeEach("Before Each", () => {
    console.log(">> Running new Test");
  });

  /*
  // TEST
  test.skip("Login script", async ({ browser }) => {
    // Since beforeAll might be skipped, create a new context if it's undefined
    context = context || (await browser.newContext({ viewport: { width: 1920, height: 1080 } }));
    page = page || (await context.newPage());

    // Navigate to Salesforce website
    await page.goto("https://test.salesforce.com/");

    // Verify page title
    await expect(page).toHaveTitle(loginInPageTitle);

    // Enter Username
    await page.locator(usernameLocator).fill(ip_username);

    // Enter Password
    const element_password = page.locator(passwordLocator);
    await expect(element_password).toBeVisible();
    await element_password.fill(ip_password);

    // Click Login
    await page.locator(loginLocator).click();

    // Start Tracing with Screenshot and Snapshot
    //await context.tracing.start({screenshos: true, snapshots: true});

    // Stop Tracing
    //await context.tracing.stop({path: 'traceLocation.zip'})

    await page.close();
  });
*/

test.only("Login script with JS", async ({ browser }) => {
    // Since beforeAll might be skipped, create a new context if it's undefined
    context = context || (await browser.newContext({ viewport: { width: 1920, height: 1080 } }));
    page = page || (await context.newPage());

    // Navigate to Salesforce website and Login with username and password
    const login = new loginPage(page);
    await login.loginWithCredentials(url, ip_username, ip_password);
    
    await page.close();
  });

  // AFTER EACH
  test.afterEach("After Each", () => {
    console.log(">> New Test run is completed");
  });

  // AFTER ALL
  test.afterAll("End Trace after all", async () => {
    if (context && runSetupAndTeardown) {
      await context.tracing.stop({ path: traceLocation });
      await context.close();
    }
  });
});
