// e2e/fixtures.ts
import { test as base } from '@playwright/test';

export const test = base.extend<{
    uniqueEmail: string;
    uniqueUsername: string;
}>({
    uniqueEmail: async ({ }, use) => {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const uniqueEmail = `test.${timestamp}.${randomId}@example.com`;
        await use(uniqueEmail);
    },
    uniqueUsername: async ({ }, use) => {
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const uniqueUsername = `user.${timestamp}.${randomId}`;
        await use(uniqueUsername);
    }
});