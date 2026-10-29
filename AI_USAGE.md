# AI Usage Disclosure

## AI Tool Used
ChatGPT (OpenAI)

## Purpose of AI Assistance
AI assistance was used to support the development and documentation of the Playwright JavaScript automation assessment.

## Prompts and Assistance

| Prompt / Request | AI Assistance |
|---|---|
| Help me set up the Playwright step by step. | Guided project setup and explained the role of Playwright configuration and Page Objects. |
| Help me create a Login Page Object. | Generated login locators and methods for opening the application and submitting credentials. |
| Help me create Inventory, Cart, and Checkout Page Objects. | Generated reusable methods for product sorting, cart operations, checkout validation, and order completion. |
| Help me automate standard and locked-out login scenarios. | Generated Playwright tests with assertions for successful login and login errors. |
| Help me verify product sorting and cart operations. | Generated tests for ascending price sorting, adding two products, removing one, and checking the cart badge and contents. |
| Help me test checkout validation and totals. | Generated parameterized missing-field tests and a subtotal-plus-tax calculation assertion. |
| Help me verify order completion and post-logout access. | Generated tests for order confirmation, empty cart verification, and protected-page access after logout. |
| Help me configure Playwright reporting and browser execution. | Assisted with HTML and JUnit reporters, failure screenshots, single-worker execution, browser visibility, and slow-motion settings. |
| Help me document setup and test execution. | Assisted in drafting the README, installation instructions, test commands, and manual-to-automated test mapping. |

## Human Review and Validation

The generated code was added to the project and executed locally. Test failures and configuration errors were reviewed and corrected during development. The test suite was rerun to confirm passing results at the reported checkpoints.

Before submission, the final code, test results, test coverage, and documentation must be reviewed to ensure they accurately represent the final repository state.

## Limitations

AI-generated suggestions may contain errors or assumptions. Application behavior and expected results were checked through execution against the Sauce Demo practice application where possible. The final implementation and submission remain subject to manual review.
