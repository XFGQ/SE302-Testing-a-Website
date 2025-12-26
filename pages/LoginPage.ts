import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.locator('input[type="email"]');

    this.passwordInput = page.locator('input[type="password"]');

    this.loginButton = page.locator('button[type="submit"]');
    
  }

  async goto() {
    await this.page.goto('https://sweetshop.netlify.app/login');
  }

  async login(email: string, pass: string) {

    if (email) await this.emailInput.fill(email);

    if (pass) await this.passwordInput.fill(pass);



    await this.loginButton.click();
  }
}