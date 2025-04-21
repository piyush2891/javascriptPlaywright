import {test, expect} from '@playwright/test'

test('login validation', async ({page})=>{
    await page.goto("https://www.demoblaze.com/");
    const pageName = await page.locator("a[id='nava']").textContent();
    await expect(pageName).toContain("PRODUCT STORE");
    await page.locator("#login2").click();
    await page.locator("#loginusername").fill("pkt2891bsj");
    await page.locator("#loginpassword").fill("12345dfbg");
    await page.locator("button[onclick='logIn()']").click();
    await page.on('dialog', dialog=>{
        expect(dialog.message()).toContain("User does not exist.");
        console.log(dialog.message());
        
    })



})