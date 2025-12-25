import { expect, type Locator, type Page } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly addToBasketBtn: Locator;
  readonly cartBadge: Locator;
  readonly checkoutLink: Locator;
  
  // Checkout Form Elementleri
  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly checkoutSubmitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // DÜZELTME: Senin verdiğin HTML'e göre güncellendi (.addItem)
    this.addToBasketBtn = page.locator('a.addItem').first(); 

    this.cartBadge = page.locator('.badge-success'); 
    this.checkoutLink = page.locator('a[href="/basket"]');
    
    // Checkout form (Sitedeki gerçek id'ler)
    this.nameInput = page.locator('#name');
    this.addressInput = page.locator('#address');
    this.checkoutSubmitBtn = page.locator('button:has-text("Checkout")');
  }

  async gotoSweets() {
    await this.page.goto('https://sweetshop.netlify.app/sweets');
  }

  async addItemToCart() {
    // Tıklamadan önce görünür olmasını bekle
    await this.addToBasketBtn.waitFor({ state: 'visible' });
    await this.addToBasketBtn.click();
  }

  async goToCheckout() {
    await this.page.goto('https://sweetshop.netlify.app/basket');
    await this.page.locator('text=Checkout').click();
  }

  async fillCheckoutForm(name: string, address: string) {
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
    // Kart bilgileri vb. eklenebilir
  }
}