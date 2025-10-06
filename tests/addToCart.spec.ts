import { test, expect } from '@playwright/test';

test.describe('Add to Cart Functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
    });

    test('should add the product, validate in header, dropdown, and remove from cart', async ({ page }) => {

        const productName = 'MacBook';

        await page.getByRole('button', { name: ' Add to Cart' }).first().click();
        await expect(page.locator('.alert-success')).toBeVisible();
        await expect(page.locator('.alert-success')).toContainText('Success: You have added MacBook to your shopping cart!');

        const productCart = await page.getByRole('button', { name: ' 1 item(s) - $' });
        await expect(productCart).toContainText('1 item(s)');
        await expect(productCart).toContainText(/602\.00/);
        await productCart.click()

        const cartDropdown = page.locator('#cart');
        await expect(cartDropdown).toContainText(productName);
        await expect(cartDropdown).toContainText('x1');
        await expect(cartDropdown).toContainText(/602\.00/);
        await expect(cartDropdown).toContainText('Sub-Total');
        await expect(cartDropdown).toContainText(/500\.00/);
        await expect(cartDropdown).toContainText('Eco Tax');
        await expect(cartDropdown).toContainText(/2\.00/);
        await expect(cartDropdown).toContainText('VAT');
        await expect(cartDropdown).toContainText(/100\.00/);
        await expect(cartDropdown).toContainText('Total');
        await expect(cartDropdown).toContainText(/602\.00/);

        const removeButton = page.getByRole('button', { name: '' });
        await removeButton.click();

        const updatedCart = page.getByRole('button', { name: /0 item\(s\)/ });
        await expect(updatedCart).toContainText('0 item(s)');
        await expect(updatedCart).toContainText(/0\.00/);
        await updatedCart.click();
        await expect(cartDropdown).toContainText('Your shopping cart is empty!');
    });

});



test.describe('View Cart Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home', { waitUntil: 'networkidle' });;
        await page.getByRole('button', { name: ' Add to Cart' }).first().click();
        const productCart = await page.getByRole('button', { name: ' 1 item(s) - $' });
        await productCart.click()
        await page.getByRole('link', { name: 'View Cart' }).click();
        await expect(page).toHaveURL(/route=checkout\/cart/);
        await expect(page.locator('#content').getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    });

    test('should display correct product details in cart', async ({ page }) => {
        const cartTable = page.locator('.table-responsive');
        await expect(cartTable.getByRole('cell', { name: 'MacBook *** Reward Points:' }).getByRole('link', { name: 'MacBook' })).toBeVisible();
        await expect(cartTable.locator('input[name*="quantity"]')).toHaveValue('1');
    });

    test('should update quantity and reflect totals', async ({ page }) => {
        const cartTable = page.locator('.table-responsive');
        const quantityInput = cartTable.locator('input[name*="quantity"]');

        await quantityInput.fill('2');
        const updateButton = await page.getByRole('button', { name: '' })
        await updateButton.click();
        const successAlert = page.locator('.alert-success');
        await expect(successAlert).toBeVisible();
        await expect(successAlert).toContainText('Success: You have modified your shopping cart!');
        await expect(page.locator('#content form').getByRole('cell', { name: '$1,204.00' })).toBeVisible();


    });

    test('should remove product and show empty cart message', async ({ page }) => {
        const cartTable = page.locator('.table-responsive');
        await cartTable.getByRole('button', { name: '' }).click();
        await expect(page.locator('#content').getByText('Your shopping cart is empty!')).toBeVisible();
    });

    test('should handle invalid quantity input (negative number)', async ({ page }) => {
        const quantityInput = page.locator('.table-responsive input[name*="quantity"]');
        await quantityInput.fill('-3');
        const updateButton = await page.getByRole('button', { name: '' })
        await updateButton.click();
        await expect(page.locator('#content')).toContainText('Your shopping cart is empty!');

    });
});

