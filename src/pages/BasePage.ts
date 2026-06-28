import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage: Abstract base class providing shared utilities
 * inherited by all page objects.
 */
export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ── Navigation ──────────────────────────────────────────────────────
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  // ── Element Actions ─────────────────────────────────────────────────
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.clear();
    await locator.fill(value);
  }

  async selectOption(locator: Locator, value: string): Promise<void> {
    await locator.selectOption({ value });
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  async getCount(locator: Locator): Promise<number> {
    return locator.count();
  }

  async getAllTexts(locator: Locator): Promise<string[]> {
    return locator.allTextContents();
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async hoverOver(locator: Locator): Promise<void> {
    await locator.hover();
  }

  // ── Assertions ──────────────────────────────────────────────────────
  async assertVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async assertText(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toHaveText(expected);
  }

  async assertUrl(expected: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expected));
  }

  async assertTitle(expected: string): Promise<void> {
    // SauceDemo shows each section's heading in a ".title" element
    // (e.g. "Products", "Your Cart"). The document <title> is always
    // "Swag Labs", so we assert against the visible heading instead.
    await expect(this.page.locator('.title')).toHaveText(expected);
  }

  // ── Screenshot ──────────────────────────────────────────────────────
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }
}
