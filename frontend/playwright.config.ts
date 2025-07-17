import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',

    timeout: 30 * 1000,
    retries: 0,

    fullyParallel: true,

    testIgnore: ['**/*.component.spec.ts', '**/*.service.spec.ts'],

    use: {
        baseURL: 'http://localhost:4200',
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // You can enable these if needed:
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
    ],

    // reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],

    webServer: {
        command: 'npm run start',
        port: 4200,
        reuseExistingServer: !process.env.CI,
        timeout: 120 * 1000, // wait 2 minutes max for Angular to boot
    },
});
