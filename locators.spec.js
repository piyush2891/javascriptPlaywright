import {test, expect} from '@playwright/test';


test ('Locators', async ({page}) => {
    //locating the page url
    await page.goto("https://demoblaze.com/");
    //locating the login button on the page and click action
    await page.locator("a[id='login2']").click();
    //locating the username input box and entering username
    await page.locator("[id='loginusername']").fill("pk12");
    //locating the password box and entering password
    await page.locator("[id='loginpassword']").fill("12345678");
    //locating the login button
    await page.click("[onclick='logIn()']");
    //saving the value of logout button which is present on home page
    const logoutLink = await page.locator("[id='logout2']");
    //this is assertion to verify logout is present or not
    await expect(logoutLink).toBeVisible();
    //closing the page
    await page.close();

})