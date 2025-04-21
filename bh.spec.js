import {test, expect} from '@playwright/test';

test('verify comments', async ({page})=>{
    await page.goto("https://www.brighthorizons.com/")
    await page.locator("body > nav > div.nav-primary-wrap.js-nav-primary-wrap > ul > li:nth-child(7) > a").click()
})