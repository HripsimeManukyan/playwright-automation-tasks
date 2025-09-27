import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
});

test.describe('Search functionality', () => {

    const searchItems = ["Mac", "iPhone"];

    for (const searchItem of searchItems) {

        test(`Verify valid product ${searchItem} search`, async ({ page }) => {
            await page.getByRole("textbox", { name: 'Search' }).click();
            await page.getByRole("textbox", { name: 'Search' }).fill(searchItem);
            await page.locator("button.btn.btn-default").click();

            const products = await page.locator(' .product-thumb caption h4').allTextContents();

            for (const product of products) {
                expect(product.toLowerCase()).toContain(searchItem);
            }
        });
    }


    const InvalidSearchItems = ["մակ", "1phone", "1234", "%$*@"];

    for (const InvalidSearchItem of InvalidSearchItems) {

        test.only(`Verify Invalid product ${InvalidSearchItem} search`, async ({ page }) => {
            await page.getByRole("textbox", { name: 'Search' }).click();
            await page.getByRole("textbox", { name: 'Search' }).fill(InvalidSearchItem);
            await page.locator("button.btn.btn-default").click();
            await expect(page.locator("div[id='content'] h1")).toBeVisible();
            await expect(page.locator('text=There is no product that matches the search criteria.')).toBeVisible();
            await expect(page.getByText('Products meeting the search criteria')).toBeVisible();

        });
    }

}); 
