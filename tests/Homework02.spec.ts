import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';

test.describe('Sweet Shop - Final 5 Test Cases', () => {


    //after every test clear cookies
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

// TC_02: Negative Scenario (Empty Login)
   
  test('TC_02: Empty Login - Should not allow entry', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // without typing email and password click login
    await loginPage.login('', '');

    //after clicking login check that "Welcome back" text is not visible    
    const welcomeText = page.locator('text=Welcome back');
    await expect(welcomeText).not.toBeVisible();
     //and go to dashboard(index) page 

    await expect(page).toHaveURL(/.*login.*/);
  });
  // TC_03: Empty Login Form (Negatif Senaryo)
  test('TC_03: Empty Login Form - Should not submit', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    //click login button without filling any input 
    await loginPage.loginButton.click();
    
     await expect(page).toHaveURL(/.*login.*/);
  });

  // TC_04: Add to Cart (using button)
  test('TC_04: Add to Cart - Should increase badge', async ({ page }) => {
    const shopPage = new ShopPage(page);
    await shopPage.gotoSweets();
    await shopPage.addItemToCart();
    
    // Badget is 1 confirm it?
    await expect(shopPage.cartBadge).toHaveText('1');
  });

  // TC_05: Remove from Cart  
  test('TC_05: Remove from Cart - Should clear basket', async ({ page }) => {
    const shopPage = new ShopPage(page);
    
    // add items
    await shopPage.gotoSweets();
    await shopPage.addItemToCart();
    
    // go to basket
    await shopPage.goToBasket();
    
    // delete Item 
    await shopPage.deleteItemBtn.click();
    
    });

  // TC_09: Menu Navigation (URL Assertion)
  test('TC_09: Menu Navigation - Navigate to About', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    
    // click navigation link
    await page.click('nav a[href="/about"]');
    
    // URL should contain /about    
    await expect(page).toHaveURL(/.*about/);
  });

});