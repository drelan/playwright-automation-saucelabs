import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';
import { CREDENTIALS } from '@config/environments';

type PageFixtures = {
  loginPage:       LoginPage;
  inventoryPage:   InventoryPage;
  authenticatedInventoryPage: InventoryPage;
};

/**
 * Extended test fixture: inject page objects directly into test blocks.
 * Usage: import { test } from '@fixtures/index'
 */
export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // Fixture that auto-logs in before handing control to the test
  authenticatedInventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      CREDENTIALS.standardUser.username,
      CREDENTIALS.standardUser.password
    );
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.assertOnInventoryPage();
    await use(inventoryPage);
  },
});

export { expect } from '@playwright/test';
