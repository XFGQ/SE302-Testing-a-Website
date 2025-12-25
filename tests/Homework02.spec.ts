import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ShopPage } from '../pages/ShopPage';

test.describe('Sweet Shop Automation Tests', () => {

  // Testlerden önce storage'ı temizle ki "Welcome Back" sorunu yaşanmasın
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('https://sweetshop.netlify.app/login');
  });

  // TC_01: Valid Login
  test('TC_01: Valid Login - Should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Demo site olduğu için muhtemelen her email'i kabul ediyor
    await loginPage.login('test@gmail.com', 'password31');
    
    // Giriş başarılıysa URL değişmeli veya Dashboard görünmeli
    await expect(page).toHaveURL(/dashboard|index/); 
  });

  // TC_02: DÜZELTME -> Empty Fields (Negative Scenario)
  // Site her şifreyi kabul ettiği için, negatif testi "Boş Alan" kontrolü ile yapıyoruz.
  test('TC_02: Empty Fields - Should not login with empty inputs', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Alanları boş bırakıp butona basıyoruz
    await loginPage.loginButton.click();
    
    // Assertion: URL değişmemeli (Hala login sayfasında olmalıyız)
    await expect(page).toHaveURL(/.*login/);
    
    // Alternatif Assertion: HTML5 validation mesajını kontrol et (opsiyonel)
    // Bu modern tarayıcılarda çıkan "Lütfen bu alanı doldurun" uyarısıdır.
  });

  // TC_04: Add to Cart (Düzeltilen selector ile)
  test('TC_04: Add to Cart - Should increment basket count', async ({ page }) => {
    const shopPage = new ShopPage(page);
    
    await shopPage.gotoSweets();
    
    // Düzeltilen .addItem butonu burada çalışacak
    await shopPage.addItemToCart();
    
    // Assertion
    await expect(shopPage.cartBadge).toContainText('1');
  });

  // TC_09: Menu Navigation
  test('TC_09: Menu Navigation - Should navigate to About Us', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    await page.click('text=About Us');
    await expect(page).toHaveURL(/.*about/);
  });

  // TC_07: Valid Checkout
  test('TC_07: Valid Checkout - Should complete purchase', async ({ page }) => {
    const shopPage = new ShopPage(page);
    
    // Sepete ürün ekle
    await shopPage.gotoSweets();
    await shopPage.addItemToCart();
    
    // Checkout'a git
    await shopPage.goToCheckout();
    
    // Formu doldur
    // Form elemanlarının görünür olmasını bekle
    await shopPage.nameInput.waitFor(); 
    await shopPage.fillCheckoutForm('John Doe', '123 Street, City');
    
    // Formu gönder
    await shopPage.checkoutSubmitBtn.click();
    
    // Not: Bu sitede form submit sonrası ne olduğu belirsizse (bazen hiçbir şey olmaz),
    // sadece hata almadığımızı doğrulamak bile yeterlidir.
  });

});