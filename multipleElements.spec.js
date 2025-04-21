import {test, expect} from '@playwright/test';

test('multiple Elemenets', async ({page}) => {
    await page.goto("https://demoblaze.com/index.html");

    //page.waitForSelector("//div[@id='tbodyid']//div/h4/a");
    const elements = await page.$$("//div[@id='tbodyid']//div/h4/a");

    
    for (let ele of elements){
        const elementText = await ele.textContent();
        console.log(elementText);
    }
})