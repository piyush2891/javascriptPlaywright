const {expect, page,test} = require('@playwright/test');

test.describe('Multiple Locator Strategy',() =>{
    test('get By Role test', async ({page})=>{
        await page.goto('https://ecommerce-playground.lambdatest.io/')
        await page.getByRole('button', {name : 'Search'}).click()
        //await page.getByRole('button', {type : 'submit'}).click()
    })
})