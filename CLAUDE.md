# CLAUDE.md — SauceDemo Playwright Framework

## Project context
Playwright + TypeScript UI automation framework for https://www.saucedemo.com.
Follows Page Object Model. Node.js runtime. Tests run with `npx playwright test`.

## Folder structure (strict — do not deviate)
```
.
├── config/             # environments.ts — .env loader, CREDENTIALS, CONFIG (base URL, timeouts)
├── src/
│   ├── pages/           # Page Object classes, one file per page — extend BasePage
│   ├── locators/        # Locator definitions, one file per page
│   ├── fixtures/        # Custom Playwright fixtures (test.extend) — index.ts
│   ├── constants/        # AppConstants.ts — URLs, titles, messages, sort options (non-secret)
│   └── utils/             # Shared helpers (e.g. DataGenerator)
├── tests/                 # Test specs, one file per feature
├── reports/               # Auto-generated HTML report + screenshots — never edit manually
└── test-results/          # Auto-generated — never edit manually
```

Path aliases are configured in `tsconfig.json` — always import across folders via these, never deep relative paths:
`@pages/*`, `@locators/*`, `@fixtures/*`, `@constants/*`, `@utils/*`, `@config/*`

## Before writing any code
1. List every file you plan to create or modify and what each will do
2. Wait for my approval before touching any file
3. Run `npx playwright test --list` after adding tests to confirm they're discovered (Playwright has no `--dry-run` flag)
4. Run `npx tsc --noEmit` to confirm no TypeScript errors

## Architecture rules
- Locators go in `src/locators/*.ts`, one file per page. Standard pattern (see `LoginLocators.ts`): a class taking `Page` in the constructor, with getters returning locators in Playwright's recommended priority order: `getByRole()` > `getByLabel()` > `getByPlaceholder()` > `getByText()` > `getByTestId()` (data-test fallback).
  - `playwright.config.ts` sets `testIdAttribute: 'data-test'`, so `getByTestId()` targets SauceDemo's `data-test` attributes directly — no need to hand-roll `[data-test="..."]` selectors except for decorative/CSS-only elements.
  - Note: `InventoryLocators.ts` still uses an older plain-object/string-selector style. Treat `LoginLocators.ts` as the standard for any new locator file; don't copy `InventoryLocators.ts`'s pattern.
- Page Objects go in `src/pages/*.ts` as classes that extend `BasePage` (shared navigate/click/fill/assert helpers) and take a `Page` in the constructor.
- Tests get page objects via fixtures only (`@fixtures/index`) — never construct a page object or use raw locators directly in spec files.
- Use Playwright fixtures (`test.extend` in `src/fixtures/index.ts`) for page-object injection and login-state reuse — see the `authenticatedInventoryPage` fixture for tests that need to start pre-logged-in.
- All waits must be auto-wait via Playwright's built-in retry — no `page.waitForTimeout()`.
- Use `expect(locator).toBeVisible()` style assertions — prefer `BasePage`'s `assertVisible`/`assertText`/`assertUrl`/`assertTitle` helpers over manual polling.

## TypeScript conventions
- Strict mode enabled (`"strict": true` in tsconfig.json)
- No `any` types — use proper interfaces
- Async/await throughout — no `.then()` chains
- Exports: named exports only, no default exports in page objects

## Test conventions
- One top-level `test.describe` block per feature in each spec file; nested `test.describe` sub-blocks group scenarios (e.g. Positive/Negative) — see `login.spec.ts`
- Tags are embedded directly in the test title string, e.g. `test('@smoke should...', ...)` — not the `{ tag: [...] }` option — since `--grep` matches against the title
- Run smoke tests with: `npx playwright test --grep @smoke`
- Each test must be fully independent — no shared state between tests
- Use `test.beforeEach` for per-test setup (e.g. navigation), not `test.beforeAll`

## Model guidance
- Use Sonnet for: adding tests, fixing locators, generating page objects
- Use Opus for: config setup, TypeScript architecture decisions, complex fixtures
- For tasks touching more than 3 files: plan first, execute after approval

## Never
- Never use `page.waitForTimeout()` — it's a code smell in Playwright
- Never hardcode credentials — use `CREDENTIALS` from `config/environments.ts` (loaded from `.env`); use `AppConstants` in `src/constants/AppConstants.ts` for non-secret values (URLs, titles, messages, sort options)
- Never modify `playwright.config.ts` without telling me first
- Never install new npm packages without listing them and waiting for approval
- Never touch anything in `test-results/` or `reports/` — auto-generated
