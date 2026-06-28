import { test, expect } from '@fixtures/index';
import { AppConstants } from '@constants/AppConstants';
import { CREDENTIALS } from '@config/environments';

test.describe('Authentication — Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  // ── Positive Scenarios ─────────────────────────────────────────────
  test.describe('Positive Login Scenarios', () => {
    test(
      '@smoke should successfully login with standard_user credentials',
      async ({ loginPage, page }) => {
        await loginPage.login(
          CREDENTIALS.standardUser.username,
          CREDENTIALS.standardUser.password
        );
        await expect(page).toHaveURL(/inventory/);
      }
    );

    test(
      '@regression should redirect to inventory page after successful login',
      async ({ loginPage, inventoryPage }) => {
        await loginPage.login(
          CREDENTIALS.standardUser.username,
          CREDENTIALS.standardUser.password
        );
        await inventoryPage.assertOnInventoryPage();
      }
    );
  });

  // ── Negative Scenarios ─────────────────────────────────────────────
  test.describe('Negative Login Scenarios', () => {
    test(
      '@regression should show error for locked_out_user',
      async ({ loginPage }) => {
        await loginPage.login(
          CREDENTIALS.lockedUser.username,
          CREDENTIALS.lockedUser.password
        );
        const error = await loginPage.getErrorMessage();
        expect(error).toContain(AppConstants.MESSAGES.LOCKED_USER_ERROR);
      }
    );

    test(
      '@regression should show error when username is empty',
      async ({ loginPage }) => {
        await loginPage.login('', CREDENTIALS.standardUser.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toContain(AppConstants.MESSAGES.MISSING_USERNAME);
      }
    );

    test(
      '@regression should show error when password is empty',
      async ({ loginPage }) => {
        await loginPage.login(CREDENTIALS.standardUser.username, '');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain(AppConstants.MESSAGES.MISSING_PASSWORD);
      }
    );

    test(
      '@regression should show error for invalid credentials',
      async ({ loginPage }) => {
        await loginPage.login('invalid_user', 'wrong_password');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain(AppConstants.MESSAGES.INVALID_CREDS);
      }
    );

    test(
      '@regression should clear error message when X button is clicked',
      async ({ loginPage }) => {
        await loginPage.login('', '');
        expect(await loginPage.isErrorVisible()).toBeTruthy();
        await loginPage.dismissError();
        expect(await loginPage.isErrorVisible()).toBeFalsy();
      }
    );
  });
});
