import {test, expect} from '@playwright/test';

test('e2eProductSelection', async ({page})=>{
    const emailBox = page.locator("input[type='email']");
    const passWordBox = page.locator("#userPassword");
    const userName = "piyushtomar39@gmail.com";
    const passWord = "1234@#Vivo";
    const loginButton = page.locator("#login");
    const secondPage = page.locator("#res");
    const desiredProductName = "Banarsi Saree";
    const products = page.locator(".card-body");
    const productValue = "231500";
    
    // login to the application
    await page.goto("https://rahulshettyacademy.com/client/");
    await emailBox.fill(userName);
    await passWordBox.fill(passWord);
    await loginButton.click();
    await page.waitForLoadState("networkidle");
    await secondPage.waitFor();
    // select the product
    const productList = await page.locator(".card-body b").allTextContents();
    console.log(productList);
    const productCount = await page.locator(".card-body b").count();
    for(let i=0; i < productCount; i++){
        if (await products.nth(i).locator("b").textContent() === desiredProductName){
            // const cartButton = product.locator("text= Add To Cart");
            // await cartButton.click();
            await products.nth(i).locator("text= Add To Cart").click();
            break;

        }
    }
    await page.locator("button[routerlink*='dashboard']").last().click();
    await page.locator("text= My Cart").waitFor();
    expect(await page.locator("text= Banarsi Saree")).toBeVisible();
    // const value = page.locator("ul li span[class='value']").last().textContent();
    // console.log("product price is:",value);
    // const absValue = await value.split("$");
    // const absoluteValue = absValue[1];
    // if (productValue === absoluteValue){
    //     page.locator("text=Checkout").click();
    // }
    await page.locator("text=Checkout").click();
    await page.locator("text= Quantity: 1 ").waitFor();
    const bool = await page.locator("text=Personal Information ").isVisible();
    expect(bool).toBeTruthy();

    //payment page
    // await page.locator("input[fdprocessedid='a8y79n']").fill(123);
    // await page.locator("input[fdprocessedid='ii4qne']").fill("R Shetty");

    await page.locator("[placeholder='Select Country']").pressSequentially('ind', { delay: 100 });
    
    const dropDown = page.locator(".ta-results").first();
    //page.waitForTimeout(3000);
    await dropDown.waitFor();
    const optionsCount = await dropDown.locator("button").count();
    //const optionsCount = dropDown.count();

    for (let i=0; i< optionsCount; i++){
        const text = await dropDown.locator("button").nth(i).textContent();
        if (text === " India"){
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(userName);
    await page.locator(".action__submit").click();

    await page.waitForLoadState("networkidle");
    expect(await page.locator("text=  Thankyou for the order.  ")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);



})