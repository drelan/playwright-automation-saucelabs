# Playwright Setup on macOS (From Scratch)

## 1. Install Homebrew (Package Manager)

Open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Verify installation:

```bash
brew --version
```
-----------------------------------
## 2. Install Node.js

Install Node.js using Homebrew:

```bash
brew install node
```

Verify installation:

```bash
node --version
npm --version
```
-----------------------------------
## 3. Create a New Project Folder

```bash
mkdir playwright-project
cd playwright-project
```
-----------------------------------
## 4. Initialize Node Project

```bash
npm init -y
```

This creates a `package.json` file.
-----------------------------------
## 5. Install Playwright

Install Playwright Test framework:

```bash
npm init playwright@latest
```

You will see prompts like:

```text
✔ Do you want to use TypeScript or JavaScript?
✔ Where to put your end-to-end tests?
✔ Add a GitHub Actions workflow?
✔ Install Playwright browsers?
```

### Selections

- Choose: `TypeScript` (or JavaScript if preferred)
- Tests folder: `tests`
- GitHub Actions: `Yes`
- Install browsers: `Yes`
-----------------------------------
## 6. Project Structure Created

After installation, your project will look similar to:

```text
playwright-project/
│
├── tests/
├── playwright.config.ts
├── package.json
├── node_modules/
└── package-lock.json
```
-----------------------------------
## 7. Run First Playwright Test

Execute all tests:

```bash
npx playwright test
```

Expected output:

```text
Running 1 test using 1 worker
✓ tests/example.spec.ts

1 passed
```
-----------------------------------
## 8. Run Tests in UI Mode

```bash
npx playwright test --ui
```

This opens Playwright’s interactive UI.
-----------------------------------
## 9. Run Tests in Headed Mode

```bash
npx playwright test --headed
```
-----------------------------------
## 10. Open HTML Test Report

After test execution:

```bash
npx playwright show-report
```
-----------------------------------
# Useful Playwright Commands

## Run Specific Test File
```bash
npx playwright test tests/example.spec.ts
```

## Run in Debug mode
```bash
npx playwright test --debug
```

## Run by tag
```bash
npx playwright test --grep @smoke
```

## Run Specific Browser

### Chrome (Chromium)
```bash
npx playwright test --project=chromium
```

### Firefox
```bash
npx playwright test --project=firefox
```

### Safari/WebKit
```bash
npx playwright test --project=webkit
```
-----------------------------------
# VS Code Recommended Extensions

Install:

- Playwright Test for VSCode
- ESLint
- Prettier
-----------------------------------
# Upgrade Playwright

```bash
npm install -D @playwright/test@latest
npx playwright install
```
-----------------------------------
# Optional: Install Google Chrome Browser Channel

```bash
npx playwright install chrome
```

Use in config:

```typescript
projects: [
  {
    name: 'Google Chrome',
    use: { channel: 'chrome' },
  },
]
```
-----------------------------------
# Tech Stack

- Node.js LTS
- Playwright
- TypeScript
- VS Code
- Git

-----------------------------------
# Helpful Official Documentation

- Playwright Docs:  
  https://playwright.dev/docs/intro

- Playwright Installation Guide:  
  https://playwright.dev/docs/intro#installation

- Node.js Official Website:  
  https://nodejs.org

- Homebrew Official Website:  
  https://brew.sh