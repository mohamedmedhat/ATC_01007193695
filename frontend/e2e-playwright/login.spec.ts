import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
    test('should log in successfully with valid credentials', async ({ page }) => {

        await page.goto('http://localhost:4200/auth/login');

        await page.getByPlaceholder('Email address').fill('test@example.com');
        await page.getByPlaceholder('Choose a password').fill('password123');

        const loginBtn = page.getByRole('button', { name: 'Login' });
        await expect(loginBtn).toBeEnabled();
        await loginBtn.click();

        await page.waitForURL('http://localhost:4200/');
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.goto('http://localhost:4200/auth/login');

        await page.getByPlaceholder('Email address').fill('wrong@example.com');
        await page.getByPlaceholder('Choose a password').fill('badpass');

        const loginBtn = page.getByRole('button', { name: 'Login' });
        await expect(loginBtn).toBeEnabled();
        await loginBtn.click();

        const errorMsg = page.locator('.error-message');
        await expect(errorMsg).toBeVisible();
        await expect(errorMsg).toContainText('Invalid credentials');
    });
});
