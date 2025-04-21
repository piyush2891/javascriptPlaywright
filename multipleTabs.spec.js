import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test('multipleTabs with exception handling', async () => {
  let browser;
  let context;

  try {
    // Step 1: Launch browser
    browser =  await chromium.launch({ headless: false });
    console.log("✅ Browser launched");

    // Step 2: Create a new browser context
    context = await browser.newContext();
    console.log("✅ Browser context created");

    // Step 3: Open Google
    const googlePage = await context.newPage();
    await googlePage.goto('https://www.google.com');
    console.log("✅ Opened Google");

    // Step 4: Open Flipkart
    const flipkartPage = await context.newPage();
    await flipkartPage.goto('https://www.flipkart.com');
    console.log("✅ Opened Flipkart");

    // Step 5: Open Amazon
    const amazonPage = await context.newPage();
    await amazonPage.goto('https://www.amazon.com');
    console.log("✅ Opened Amazon");

    // Step 6: Search for laptop on Amazon
    try {
      await amazonPage.fill('input#twotabsearchtextbox', 'laptop');
      await amazonPage.press('input#twotabsearchtextbox', 'Enter');
      console.log("✅ Searched for laptop on Amazon");

      await amazonPage.waitForSelector('.s-main-slot', { timeout: 5000 });
      console.log("✅ Amazon search results loaded");
    } catch (searchError) {
      console.error("❌ Error during Amazon search:", searchError.message);
    }

  } catch (err) {
    console.error("❌ Error during browser automation:", err.message);
  } finally {
    // Always close context and browser in finally block
    if (context) {
      await context.close().catch((e) => console.error("❌ Error closing context:", e.message));
    }
    if (browser) {
      await browser.close().catch((e) => console.error("❌ Error closing browser:", e.message));
    }
    console.log("✅ Browser closed");
  }
});
