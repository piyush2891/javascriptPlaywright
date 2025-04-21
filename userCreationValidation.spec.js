const { test, expect } = require('@playwright/test');

test('User creation and login flow', async ({ browser }) => {
  // 1. Create a browser context
  const context = await browser.newContext();
  const page = await context.newPage();

  // 2. Navigate to signup page
  await page.goto('https://example.com/signup');
  console.log('Navigated to signup page.');

  // 3. Fill the registration form
  const user = {
    username: 'testuser123',
    email: `testuser_${Date.now()}@mail.com`,
    password: 'Test@1234'
  };

  await page.fill('#username', user.username);
  await page.fill('#email', user.email);
  await page.fill('#password', user.password);
  await page.fill('#confirmPassword', user.password);
  console.log('Filled registration form.');

  // 4. Submit the form
  await Promise.all([
    page.waitForNavigation(), // Wait for page to redirect
    page.click('button[type="submit"]')
  ]);
  console.log('Submitted registration form.');

  // 5. Validate successful registration (assumes toast or redirect)
  const successToast = await page.locator('.success-toast');
  await expect(successToast).toBeVisible();
  console.log('User registration validated.');

  // 6. Navigate to login page (optional if not redirected)
  await page.goto('https://example.com/login');
  console.log('Navigated to login page.');

  // 7. Fill in login form
  await page.fill('#loginEmail', user.email);
  await page.fill('#loginPassword', user.password);
  console.log('Filled login form.');

  // 8. Submit login form
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]')
  ]);
  console.log('Submitted login form.');

  // 9. Validate successful login
  const welcomeMsg = await page.locator('.welcome-message');
  await expect(welcomeMsg).toBeVisible();
  console.log('Login successful.');

  // Close browser context
  await context.close();
});
