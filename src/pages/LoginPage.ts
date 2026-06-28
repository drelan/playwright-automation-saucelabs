import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginLocators } from '@locators/LoginLocators';
import { AppConstants } from '@constants/AppConstants';

export class LoginPage extends BasePage {
  private readonly locators: LoginLocators;

  constructor(page: Page) {
    super(page);
    this.locators = new LoginLocators(page);
  }

  // ── Navigation ──────────────────────────────────────────────────────
  async goto(): Promise<void> {
    await this.navigateTo(AppConstants.URLS.LOGIN);
  }

  // ── Actions ─────────────────────────────────────────────────────────
  async enterUsername(username: string): Promise<void> {
    await this.fill(this.locators.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.locators.passwordInput, password);
  }

  async clickLogin(): Promise<void> {
    await this.click(this.locators.loginButton);
  }

  async dismissError(): Promise<void> {
    await this.click(this.locators.errorButton);
  }

  /**
   * High-level composite action: performs a full login sequence.
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // ── Getters ─────────────────────────────────────────────────────────
  async getErrorMessage(): Promise<string> {
    return this.getText(this.locators.errorContainer);
  }

  async isErrorVisible(): Promise<boolean> {
    return this.isVisible(this.locators.errorContainer);
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return this.isVisible(this.locators.loginButton);
  }
}
