import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
}
);
test.describe('Desktops', () => {
  test('PC', async ({ page }) => {
    
    await page.getByRole('link', { name: 'Desktops', exact: true }).hover();
    await page.getByRole('link', { name: 'PC (0)' }).click();
    await expect(page.getByRole('heading', { name: 'PC' })).toBeVisible();
    await expect(page).toHaveTitle("PC");


    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page).toHaveTitle("Your Store");
    await expect(page).toHaveURL("https://tutorialsninja.com/demo/index.php?route=common/home");
    await expect(page).toHaveURL(/route=common\/home/);


  });

  test.only('Mac', async ({ page }) => {
    await page.getByRole('link', { name: 'Desktops', exact: true }).hover();
    await page.getByRole('link', { name: 'Mac (1)' }).click();
    await expect(page.getByRole('heading', { name: 'Mac', exact: true })).toBeVisible();
    await expect(page).toHaveTitle("Mac");


    await expect(page).toHaveURL("https://tutorialsninja.com/demo/index.php?route=product/category&path=20_27");
    await expect(page.getByRole('link', { name: 'Continue' })).not.toBeVisible();


  });

  test('Show all desktops', async ({ page }) => {
    await page.getByRole('link', { name: 'Desktops', exact: true }).hover();
    await page.getByRole('link', { name: 'Show All Desktops' }).click();
    await expect(page.getByRole('heading', { name: 'Desktops' })).toBeVisible();
    await expect(page).toHaveTitle("Desktops");
  });


});

