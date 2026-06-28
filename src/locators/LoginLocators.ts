import { Page } from '@playwright/test';

/**
 * Centralized locator repository for the Login page.
 * Follows Playwright's recommended locator priority:
 *   1. getByRole()       — ARIA role + accessible name (preferred)
 *   2. getByLabel()      — form fields with associated labels
 *   3. getByPlaceholder()— inputs identified by placeholder text
 *   4. getByText()       — visible text content
 *   5. getByTestId()     — data-test attribute (fallback)
 */
export class LoginLocators {
  constructor(private readonly page: Page) {}

  // ------------------------------------------------------------------
  // Input Fields
  // Sauce Demo inputs have no <label>, so placeholder is the accessible
  // name. 'textbox' is the implicit ARIA role for <input type="text">.
  // ------------------------------------------------------------------

  /** Username input field */
  get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  /** Password input field */
  get passwordInput() {
    return this.page.getByPlaceholder('Password');
    // Note: type="password" inputs do NOT carry role="textbox",
    // so getByPlaceholder() is used here.
  }

  // ------------------------------------------------------------------
  // Buttons
  // ------------------------------------------------------------------

  /** Login submit button */
  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  // ------------------------------------------------------------------
  // Error Messaging
  // Errors have no ARIA role or label — getByTestId() is appropriate here.
  // ------------------------------------------------------------------

  /** Error message container */
  get errorContainer() {
    return this.page.getByTestId('error');
  }

  /** Dismiss error button (the ✕ icon) */
  get errorButton() {
    return this.page.getByTestId('error-button');
  }

  // ------------------------------------------------------------------
  // Branding / Visual Elements
  // These are decorative; CSS class fallback is acceptable here.
  // ------------------------------------------------------------------

  /** "Swag Labs" login logo text */
  get loginLogo() {
    return this.page.locator('.login_logo');
  }

  /** Bot/robot illustration image */
  get botImage() {
    return this.page.locator('.bot_column');
  }
}
