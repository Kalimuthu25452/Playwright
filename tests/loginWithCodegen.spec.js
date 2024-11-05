import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://test.salesforce.com/');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('lfqa@maxval.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Maxval@2024');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
  await page.goto('https://symphonylftd1--lfqa.sandbox.lightning.force.com/one/one.app');
  await page.goto('https://symphonylftd1--lfqa.sandbox.lightning.force.com/lightning/o/SymphonyDF__Field_Configuration__c/home');
  await page.goto('https://symphonylftd1--lfqa.sandbox.lightning.force.com/lightning/o/SymphonyDF__Field_Configuration__c/list?filterName=__Recent');
  await page.getByRole('button', { name: 'App Launcher' }).click();
  await page.getByRole('option', { name: 'System Administrator' }).click();
});