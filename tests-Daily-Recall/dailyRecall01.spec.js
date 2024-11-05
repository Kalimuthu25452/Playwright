const { test, expect } = require("@playwright/test");

// Global Variables
var context;
var page;

test.beforeAll("Start Test", async ({ browser }) => {
  context = await browser.newContext({
    viewport: null // This will maximize the browser window
  });

  await context.tracing.start({
    screenshots: true,
    snapshots: true,
  });

  page = await context.newPage();
});

const url = "https://www.example.com/login";
const username = "Kali";

test("Test Login page", async () => {
  await page.goto(url);

  await expect(page).toHaveTitle("Login | Salesforce");

  const element_username = page.locator('xpath=//input[@id="Username"]');

  await expect(element_username).toBeVisible();

  await element_username.fill(username);
});

const trace_location = "test-results\\DailyRecall01_trace.zip";
test.afterAll(async () => {
  await context.tracing.stop({ path: trace_location });
});
