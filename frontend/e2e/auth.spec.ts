import { expect } from "@playwright/test";
import { test } from "./fixtures";

test.describe("Register Page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/auth/register");
    });
    test("should register and login successfully with valid credentials", async ({ page, uniqueEmail, uniqueUsername }) => {
        const email = uniqueEmail;
        await page.getByPlaceholder("Your name").fill(uniqueUsername);
        await page.getByPlaceholder("Email address").fill(email);
        await page.getByPlaceholder("Choose a password").fill("password123");
        await page.getByRole("checkbox", { name: /I accept the terms/i }).check();

        const registerBtn = page.getByRole("button", { name: /Register/i });
        await expect(registerBtn).toBeEnabled();
        await registerBtn.click();

        await page.waitForURL(/\/auth\/login$/, { timeout: 15000 });

        // login after registration
        await page.getByPlaceholder("Email address").fill(email);
        await page.getByPlaceholder(/password/i).fill("password123");
        const loginBtn = page.getByRole("button", { name: /Login/i });
        await expect(loginBtn).toBeEnabled();
        await loginBtn.click();
        await page.waitForURL("/", { timeout: 15000 });
    });

    test('should show error with invalid registration details', async ({ page }) => {
        await page.getByPlaceholder("Your name").fill("");
        await page.getByPlaceholder("Email address").fill('invalid-email');
        await page.getByPlaceholder("Email address").blur();

        await page.getByPlaceholder("Choose a password").fill('123');
        await page.getByPlaceholder("Choose a password").blur();

        await page.getByRole("checkbox", { name: /I accept the terms/i }).check();

        const registerBtn = page.getByRole('button', { name: /Register/i });
        await expect(registerBtn).toBeDisabled();

        const emailError = page.locator('mat-error:has-text("Enter a valid email")');
        const passwordError = page.locator('mat-error:has-text("Minimum 6 characters")');
        const nameError = page.locator('mat-error:has-text("Username is required")');

        await expect(emailError).toBeVisible({ timeout: 5000 });
        await expect(passwordError).toBeVisible({ timeout: 5000 });
        await expect(nameError).toBeVisible({ timeout: 5000 });
    });


    test("should show error if terms not accepted", async ({ page, uniqueEmail, uniqueUsername }) => {
        await page.getByPlaceholder("Your name").fill(uniqueUsername);
        await page.getByPlaceholder("Email address").fill(uniqueEmail);
        await page.getByPlaceholder("Choose a password").fill("password123");

        const registerBtn = page.getByRole("button", { name: /Register/i });
        await expect(registerBtn).toBeDisabled();

        const termsError = page.locator(".checkbox-error");
        await expect(termsError).toContainText("You must accept the terms");
    });
});

test.describe("Login Page", () => {
    test("should show error with invalid login details", async ({ page }) => {
        await page.goto("/auth/login");
        await page.getByPlaceholder("Email address").fill("invalid@email.com");
        await page.getByPlaceholder("Password").fill("wrongpassword");

        const loginBtn = page.locator('form').getByRole('button', { name: /Login/i });
        await expect(loginBtn).toBeEnabled();
        await loginBtn.click();

        const errorMessage = page.locator(".error-message");
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
    });

});