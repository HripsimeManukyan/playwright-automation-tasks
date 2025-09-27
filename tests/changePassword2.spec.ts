import { test, expect } from '@playwright/test';

test.describe('Change Password Functionality', () => {

    const credentials = {
        email: 'Tesstuseraccount1@gmail.com',
        oldPassword: 'Test@123456',
        newPassword: 'Test@12345'
    };

    
    const invalidPasswordTests = [
        {
            name: 'mismatched confirm password',
            password: 'Test@123456',
            confirm: 'WrongPass123',
            expectedError: 'Password confirmation does not match password!'
        },
        {
            name: 'empty confirm password',
            password: 'Test@123456',
            confirm: '',
            expectedError: 'Password confirmation does not match password!'
        },
        {
            name: 'empty password',
            password: '',
            confirm: 'Test@123456',
            expectedError: 'Password must be between 4 and 20 characters!'
        },
        {
            name: 'both password and confirm empty',
            password: '',
            confirm: '',
            expectedError: 'Password must be between 4 and 20 characters!'
        },
        {
            name: 'short password',
            password: 'abc',
            confirm: 'abc',
            expectedError: 'Password must be between 4 and 20 characters!'
        }
    ];

    test.beforeEach(async ({ page }) => {
        await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
        await page.getByRole('link', { name: ' My Account' }).click();
        await page.getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'E-Mail Address' }).click
        await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(credentials.email);
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(credentials.oldPassword);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('#content').getByRole('heading', { name: 'My Account' })).toBeVisible();
    });



    test('Should successfully change password, login with new password, and reset', async ({ page }) => {

        await page.getByRole('link', { name: 'Change your password' }).click();
        await expect(page).toHaveURL(/route=account\/password/);
        await page.getByRole('textbox', { name: '* Password', exact: true }).click();
        await page.getByRole('textbox', { name: '* Password', exact: true }).fill(credentials.newPassword);
        await page.getByRole('textbox', { name: '* Password Confirm' }).click();
        await page.getByRole('textbox', { name: '* Password Confirm' }).fill(credentials.newPassword);
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.locator('.alert-success')).toHaveText('Success: Your password has been successfully updated.');

        // Logout and login with the new password
        await page.getByRole('link', { name: ' My Account' }).click();
        await page.locator('#top-links').getByRole('link', { name: 'Logout' }).click();
        await expect(page.locator('#content').getByRole('heading', { name: 'Account Logout' })).toBeVisible();
        await page.getByRole('link', { name: ' My Account' }).click();
        await page.locator('#top-links').getByRole('link', { name: 'Login' }).click();
        await page.getByRole('textbox', { name: 'E-Mail Address' }).click();
        await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(credentials.email);
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(credentials.newPassword);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('#content').getByRole('heading', { name: 'My Account' })).toBeVisible();

        // Reset password back to old password 
        await page.getByRole('link', { name: 'Change your password' }).click();
        await page.getByRole('textbox', { name: '* Password', exact: true }).click();
        await page.getByRole('textbox', { name: '* Password', exact: true }).fill(credentials.oldPassword);
        await page.getByRole('textbox', { name: '* Password Confirm' }).click();
        await page.getByRole('textbox', { name: '* Password Confirm' }).fill(credentials.oldPassword);
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.locator('.alert-success')).toHaveText('Success: Your password has been successfully updated.');
    });

  
    for (const testCase of invalidPasswordTests) {
        test(`Should fail to change password with ${testCase.name}`, async ({ page }) => {
            await page.getByRole('link', { name: 'Change your password' }).click();
            await expect(page).toHaveURL(/route=account\/password/);
            await page.getByRole('textbox', { name: '* Password', exact: true }).click();
            await page.getByRole('textbox', { name: '* Password', exact: true }).fill(testCase.password);
            await page.getByRole('textbox', { name: '* Password Confirm' }).click();
            await page.getByRole('textbox', { name: '* Password Confirm' }).fill(testCase.confirm);
            await page.getByRole('button', { name: 'Continue' }).click();
            await expect(page.getByText(testCase.expectedError)).toBeVisible();
        });
    }
});