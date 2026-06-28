import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { InventoryLocators } from '@locators/InventoryLocators';
import { AppConstants } from '@constants/AppConstants';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ── Navigation ──────────────────────────────────────────────────────
  async clickOnProduct(productName: string): Promise<void> {
    await this.page
      .locator(InventoryLocators.productName, { hasText: productName })
      .click();
  }

  // ── Assertions ──────────────────────────────────────────────────────
  async assertOnInventoryPage(): Promise<void> {
    await this.assertUrl(AppConstants.URLS.INVENTORY);
    await this.assertTitle(AppConstants.TITLES.PRODUCTS);
  }


}
  