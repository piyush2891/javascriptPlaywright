import {test, expect} from '@playwright/test';

test.beforeEach('Login run before every case',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/#/country");
    const userName = await page.locator("#username");
    const passWord = await page.locator("#password");
    const checkBox = await page.locator("#terms");
    const loginButton = await page.locator("#signInBtn");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await checkBox.check();
    await loginButton.click();
    const contentOfPage = await page.getByText("Shop Name");
    await expect(await contentOfPage).toBeVisible();
    


})

test('TC01 --> verify the title', async ({page})=>{
    
    //await page.getByText("User").click();
    //await page.getByText("Okay").click();
    
    const titleOfPage = await page.title();
    await expect(titleOfPage).toBe("ProtoCommerce");
})

test('TC02 --> verify the product count on the page', async ({page})=>{
    const productCount = await page.locator("app-card h4 a").count();
    await expect(productCount).toBe(4);
})

test('TC03 --> print product name & price from the page', async ({page})=>{
    //console.log(await productNames.allTextContent());
    //console.log(await productPrices.allTextContent());
    //console.log("Product Names: + Product Prices:", productNames + productPrices);
    const productNames = await page.locator("app-card h4 a");
    const productPrices = await page.locator("app-card h5");
    const allProducts = await productNames.allTextContents();
    const allPrices = await productPrices.allTextContents();
    console.log("Product Names: ", allProducts);
    console.log("Product Prices: ", allPrices);
})

test('TC04 --> add 2nd product to cart', async ({page})=>{
    const addToCartButton = await page.locator("app-card .card-footer .btn").nth(1);
    await addToCartButton.click();

})

test('TC05 --> Verify the product added to cart', async ({page})=>{
    expect(await page.locator(".nav-link.btn.btn-primary")).toBeVisible();
    //await cartButton.toBeVisible();
    await page.locator(".nav-link.btn.btn-primary").click();
    
})

test('TC06 --> Verify user is on checkout page', async ({page})=>{
    //await page.getByText("In Stock").toBeVisible();
    //const productvalue = await page.locator(".text-right h3").textContent();
    //await expect(productvalue).toBeVisible();
    await page.getByText("Checkout").click();


})

test('TC07 --> select country india for checkout', async ({page})=>{
    await page.locator("#country").fill("India").then(async ()=>{
        await page.locator(".suggestions li a").click();
    })
    await page.locator("#checkbox2").check();
    await page.locator("input[value='Purchase']").click();
    await page.locator(".alert strong").isVisible();
})