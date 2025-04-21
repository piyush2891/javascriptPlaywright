//const { default: test } = require('node:test');

const { test, expect } = require('@playwright/test');

test('Home Page', async ({page}) => {

        await page.goto('https://demoblaze.com/');
        const pageTitle = page.title();
        await expect(page).toHaveTitle('STORE');
        await expect(page).toHaveURL('https://demoblaze.com/');
        await page.close();


})
