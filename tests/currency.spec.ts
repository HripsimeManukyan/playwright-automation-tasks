import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
});

test.describe('Currency feature', () => {

  const currencies = [
    { option: '€Euro', header: '€ Currency  ', symbol: '€' },
    { option: '£Pound Sterling', header: '£ Currency  ', symbol: '£' },
    { option: '$US Dollar', header: '$ Currency  ', symbol: '$' },
  ];

  for (const { option, header, symbol } of currencies) {
    test(`should switch to ${option} and update header + product prices`, async ({ page }) => {
      await page.getByRole('button', { name: "Currency" }).click();

      await page.getByRole('button', { name: option }).click();


      await expect(page.getByRole('button', { name: header })).toBeVisible();

      const prices = page.locator('.price');
      const count = await prices.count();
      for (let i = 0; i < count; i++) {
        await expect(prices.nth(i)).toContainText(symbol);
      }
    });
  }
});
