# Harvee QA Automation Assessment

## 1. Overview

This project contains UI automation tests for the Sauce Demo shopping application using Playwright with JavaScript and the Page Object Model (POM).

The suite covers login, product sorting, cart operations, checkout validation, price calculations, order confirmation, and protected-page access after logout.

## 2. Prerequisites

- Node.js and npm
- Visual Studio Code or another code editor
- Git
- Playwright browser dependencies

## 3. Installation and Setup

### Prerequisites

- Node.js (npm is included with the Node.js installation)
- Internet connection for installing dependencies and the Chromium browser

### Step 1: Verify Node.js and npm

Open a terminal in the project root directory and run:

```bash
node -v
npm -v
```

Both commands should display their installed versions. If either command is unavailable, install Node.js from https://nodejs.org/ and reopen the terminal.

### Step 2: Install Project Dependencies

```bash
npm install
```

This installs the dependencies listed in `package.json` and `package-lock.json`.

### Step 3: Install the Chromium Browser

```bash
npx playwright install chromium
```

This installs the browser required by the Playwright configuration.

### Step 4: Run All Automated Tests

```bash
npx playwright test
```

This executes all tests discovered by the Playwright configuration.

### Step 5: View the Test Report

```bash
npx playwright show-report
```

This opens the HTML report after the test run. If no report is available, run the tests first.


## 4. Configuration

The base URL is configured in `playwright.config.js` and can be overridden using the `BASE_URL` environment variable.

Test usernames and passwords can be configured through the `STANDARD_USERNAME`, `LOCKED_OUT_USERNAME`, and `TEST_PASSWORD` environment variables. If these variables are not set, the project uses the default public Sauce Demo practice credentials.


## 5. Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in Chromium:

```bash
npx playwright test --project=chromium
```

Run a specific test:

```bash
npx playwright test -g "TC01" --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

## 6. Page Object Model

- `pages/LoginPage.js` — login interactions and error message.
- `pages/InventoryPage.js` — product sorting, adding products, cart navigation, and logout.
- `pages/CartPage.js` — cart contents, product removal, and checkout navigation.
- `pages/CheckoutPage.js` — customer details, validation, totals, and order completion.
- `test-data/users.js` — shared practice-site test credentials.

## 7. Manual-to-Automated Test Mapping

The following manual test cases from `TEST_CASES.md` have been implemented in the Playwright automation suite `tests/login.spec.js`.

| Manual Test Case | Automated Coverage |
|---|---|
| TC01 – Successful Login | Implemented |
| TC02 – Locked-Out User Login | Implemented |
| TC08 – Sort Products by Price (Low to High) | Implemented |
| TC12 – Add and Remove Products from Cart | Implemented |
| TC17 – Checkout Form Validation | Implemented |
| TC18 – Checkout Price Calculation | Implemented |
| TC20 – Complete Checkout | Implemented |
| TC21 – Logout and Access Restriction | Implemented |

**Note:** Only the test cases listed above have been implemented in the current automation suite. Other test cases in `TEST_CASES.md` remain manual test cases or candidates for future automation.

## 8. Test Independence and Reliability

Each test should establish its own starting state, use Playwright's auto-waiting assertions, and avoid fixed sleeps. Screenshots are captured on failure through the Playwright configuration.

## 9. Scaling to 200 Tests

To expand the suite, I would:

1. Organize tests by feature, such as login, inventory, cart, and checkout.
2. Reuse Page Objects and shared test-data fixtures.
3. Use parameterized tests for validation scenarios and multiple products.
4. Tag smoke, regression, and critical-path tests.
5. Run independent tests in parallel after validating isolation.
6. Integrate the suite into CI and publish HTML/JUnit reports.
7. Monitor flaky tests and keep test data deterministic.
8. Add API tests where supported to reduce unnecessary UI execution.

## 10. AI Assistance

AI assistance was used during development. The `AI_USAGE.md` file documents the prompts and the changes made with assistance. All generated code should be reviewed and validated before submission.