import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
});

test.describe('Login Functionality', () => {

    const validCredentials = { email: 'exampletest@gmail.com', password: 'Qa!2025Test' };

    const invalidCredentials = [
        { scenario: 'invalid email format', email: 'exampletestgmail.com', password: 'Qa!2025Test' },
        { scenario: 'wrong password', email: 'exampletest@gmail.com', password: 'wrongpassword' },
        { scenario: 'empty email field', email: '', password: 'Qa!2025Test' },
        { scenario: 'empty password field', email: 'exampletest@gmail.com', password: '' },
        { scenario: 'both empty fields', email: '', password: '' },

    ];
    test('Should successfully login with valid credentials', async ({ page }) => {
        await page.locator('a[title="My Account"]').click();
        await page.getByRole('link', { name: 'Login' }).click();
        await expect(page.locator('h2:has-text("Returning Customer")')).toBeVisible();
        await expect(page).toHaveURL(/route=account\/login/);

        await page.getByRole('textbox', { name: 'E-Mail Address' }).click
        await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(validCredentials.email);
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(validCredentials.password);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('#content').getByRole('heading', { name: 'My Account' })).toBeVisible();
        await expect(page).toHaveURL(/route=account\/account/);
    });

    for (const creds of invalidCredentials) {
        test(`Should fail login with ${creds.scenario}`, async ({ page }) => {
            await page.locator('a[title="My Account"]').click();
            await page.getByRole('link', { name: 'Login' }).click();
            await expect(page.locator('h2:has-text("Returning Customer")')).toBeVisible();
            await expect(page).toHaveURL(/route=account\/login/);

            await page.getByRole('textbox', { name: 'E-Mail Address' }).click
            await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(creds.email);
            await page.getByRole('textbox', { name: 'Password' }).click();
            await page.getByRole('textbox', { name: 'Password' }).fill(creds.password);
            await page.getByRole('button', { name: 'Login' }).click();

            await expect(page.locator('.alert-danger')).toContainText(
                'Warning: No match for E-Mail Address and/or Password.'
            );
        });
    }

});
