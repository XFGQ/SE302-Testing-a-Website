import { expect, type Locator, type Page } from '@playwright/test';

export class ShopPage {
  readonly page: Page;
  readonly addToBasketBtn: Locator;
  readonly cartBadge: Locator;
  readonly deleteItemBtn: Locator; 

  constructor(page: Page) {
    this.page = page;
    this.addToBasketBtn = page.locator('a.addItem').first(); 
    this.cartBadge = page.locator('.badge-success');
    

    
    this.deleteItemBtn = page.locator('text=Delete Item').first();
  }

  async gotoSweets() {
    await this.page.goto('https://sweetshop.netlify.app/sweets');
  }

  async addItemToCart() {
    await this.addToBasketBtn.click();
  }

  async goToBasket() {
    await this.page.goto('https://sweetshop.netlify.app/basket');
  }
}