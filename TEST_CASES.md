# Section A1 — Manual Test Suite

## 1. Questions and Assumptions

| ID | Question for the Product Owner | Assumption if Unanswered |
|---|---|---|
| Q1 | What format and validation rules apply to the postal code? | Treat it as a required field and verify that an empty value is rejected. Do not assume a specific format without a requirement. |
| Q2 | Which characters are allowed in first and last names? | Empty and whitespace-only values should be rejected. Other character restrictions need clarification. |
| Q3 | How should tax be calculated and rounded? | The displayed total should equal the displayed item subtotal plus tax, rounded to two decimal places. |
| Q4 | Can customers add the same product to the cart more than once? | Verify the actual application behaviour and ensure the cart badge matches the cart contents. |
| Q5 | What should happen to cart contents when checkout is cancelled? | The customer should return to shopping without placing an order. Verify whether cart contents are retained. |
| Q6 | Which browsers and screen sizes are officially supported? | Use Chromium for the main automation suite and perform separate browser and viewport checks. |
| Q7 | What should happen if a logged-out user navigates directly to a protected page? | Access to protected pages should be denied until the user logs in again. |
| Q8 | What should happen if the customer refreshes the checkout page or navigates backward during checkout? | The application should preserve a consistent state and must not create duplicate orders. |


## 2. Manual Test Cases

| ID | Area | Type | Title | Pre-conditions | Steps | Test data | Expected result | Priority (P1–P3) | Automate? (Yes / No) and why |
|---|---|---|---|---|---|---|---|---|---|
| TC01 | Login | Positive | Standard user logs in successfully | User is on the login page | 1. Enter username. 2. Enter password. 3. Click Login. | `standard_user` / `secret_sauce` | Login succeeds and the Products page is displayed. | P1 | Yes — critical login smoke test. |
| TC02 | Login | Negative | Locked-out user cannot log in | User is on the login page | 1. Enter the locked-out username. 2. Enter password. 3. Click Login. | `locked_out_user` / `secret_sauce` | Login is rejected and an appropriate error is displayed. | P1 | Yes — verifies access restrictions. |
| TC03 | Login | Negative | Invalid password is rejected | User is on the login page | 1. Enter a valid username. 2. Enter an incorrect password. 3. Click Login. | `standard_user` / `wrong_password` | Login is rejected and an error is displayed. | P1 | Yes — verifies credential validation. |
| TC04 | Login | Negative | Empty username is rejected | User is on the login page | 1. Leave username empty. 2. Enter password. 3. Click Login. | Empty username / `secret_sauce` | Login is rejected and a validation error is displayed. | P1 | Yes — checks required-field validation. |
| TC05 | Login | Negative | Empty password is rejected | User is on the login page | 1. Enter a valid username. 2. Leave password empty. 3. Click Login. | `standard_user` / empty password | Login is rejected and a validation error is displayed. | P1 | Yes — checks required-field validation. |
| TC06 | Product Sorting | Positive | Sort products by name A to Z | User is logged in and on the Products page | 1. Open the sort dropdown. 2. Select Name (A to Z). 3. Verify the complete product list. | Name (A to Z) | All product names appear in ascending alphabetical order. | P2 | Yes — validates the full sorted list. |
| TC07 | Product Sorting | Positive | Sort products by name Z to A | User is logged in and on the Products page | 1. Open the sort dropdown. 2. Select Name (Z to A). 3. Verify the complete product list. | Name (Z to A) | All product names appear in descending alphabetical order. | P2 | Yes — validates reverse alphabetical ordering. |
| TC08 | Product Sorting | Positive | Sort products by price low to high | User is logged in and on the Products page | 1. Select Price (low to high). 2. Read every displayed price. 3. Verify each price is less than or equal to the next price. | Price (low to high) | The complete list is in ascending price order. | P1 | Yes — checks every adjacent price pair. |
| TC09 | Product Sorting | Positive | Sort products by price high to low | User is logged in and on the Products page | 1. Select Price (high to low). 2. Read every displayed price. 3. Verify each price is greater than or equal to the next price. | Price (high to low) | The complete list is in descending price order. | P1 | Yes — checks every adjacent price pair. |
| TC10 | Product Sorting | Usability | Verify selected sort option remains visible | User is logged in and on the Products page | 1. Select a sorting option. 2. Observe the dropdown. | Price (low to high) | The dropdown visibly indicates the selected sorting option. | P3 | No — a brief manual usability check is sufficient for this assessment. |
| TC11 | Cart | Positive | Add one product to the cart | User is logged in and on the Products page | 1. Click Add to cart for one product. 2. Check the cart badge. 3. Open the cart. | Sauce Labs Backpack | Cart badge shows 1 and the selected product appears in the cart. | P1 | Yes — verifies core cart functionality. |
| TC12 | Cart | Positive | Add two products and remove one from the cart | User is logged in and on the Products page | 1. Add two different products. 2. Verify the badge. 3. Open the cart. 4. Remove one product. | Sauce Labs Backpack; Sauce Labs Bike Light | Badge changes from 2 to 1 and only the remaining product is displayed. | P1 | Yes — verifies badge and cart contents together. |
| TC13 | Cart | Positive | Remove a product from the Products page | User is logged in and a product has been added | 1. Click Remove for the selected product on the Products page. 2. Check the badge. 3. Open the cart. | Sauce Labs Backpack | The product is removed, the badge updates, and the product is absent from the cart. | P2 | Yes — verifies removal from the Products page. |
| TC14 | Cart | Boundary | Verify an empty cart | User is logged in and the cart contains no products | 1. Open the cart. 2. Inspect the cart contents and badge. | Empty cart | No products are displayed, and no positive item count is shown on the badge. | P2 | Yes — checks the empty-cart state. |
| TC15 | Cart | Usability | Continue shopping from the cart | User is logged in and the cart page is open | 1. Click Continue Shopping. 2. Observe the page. | Existing cart item | The Products page opens and the existing cart item remains available in the cart. | P3 | No — manual usability check is sufficient for this assessment. |
| TC16 | Checkout | Positive | Complete checkout with valid details | User is logged in and has one product in the cart | 1. Open cart. 2. Click Checkout. 3. Enter first name, last name and postal code. 4. Click Continue. | First name: Rufiya; Last name: Shaik; Postal code: 533001 | Checkout Overview page is displayed with the selected item and its price. | P1 | Yes — verifies the checkout flow. |
| TC17 | Checkout Validation | Negative | Validate missing checkout information | User is logged in and has one product in the cart | 1. Open checkout information. 2. Leave one required field empty. 3. Click Continue. 4. Repeat for each required field. | Empty first name, last name or postal code, tested separately | Each submission is rejected with an appropriate validation error. | P1 | Yes — parameterized test for all three required fields. |
| TC18 | Checkout Calculation | Positive | Verify item total, tax and grand total | User is on the Checkout Overview page with products in the order | 1. Record each item price. 2. Calculate the item subtotal. 3. Compare the displayed subtotal, tax and grand total. | Sauce Labs Backpack ($29.99); Sauce Labs Bike Light ($9.99) | Item subtotal equals $39.98 (sum of the selected product prices), and grand total equals subtotal plus tax, rounded to two decimal places. | P1 | Yes — verifies the complete calculation. |
| TC19 | Checkout | Positive | Cancel checkout before placing the order | User is on the Checkout Overview page | 1. Click Cancel. 2. Observe the destination page. 3. Verify that no order confirmation appears. | Cart containing one product | User returns to the appropriate shopping page without placing the order. | P2 | Yes — verifies cancellation behaviour. |
| TC20 | Checkout | Positive | Finish checkout and verify cart is emptied | User is on the Checkout Overview page with valid order details | 1. Click Finish. 2. Verify the order confirmation. 3. Open the cart. | One product with valid checkout information | Order confirmation is displayed, and the cart is empty after the order is placed. | P1 | Yes — verifies order placement and cart reset. |
| TC21 | Security | Negative | Access Products page directly after logout | User is logged in | 1. Log out. 2. Navigate directly to `/inventory.html`. | URL: `/inventory.html` | Access is denied and the user is redirected to the login page or otherwise prevented from viewing protected content. | P1 | Yes — verifies protected-page access. |
| TC22 | Accessibility | Accessibility | Verify keyboard navigation on login page | Login page is open | 1. Navigate through username, password and Login using the keyboard. 2. Activate Login using the keyboard. | Valid credentials | All controls can be reached and operated using the keyboard, with a visible focus indicator. | P2 | No — include a manual accessibility check; automated accessibility tooling can supplement it. |
| TC23 | Responsive UI | Compatibility | Verify shopping page at a narrow viewport | User is logged in and on the Products page | 1. Set the browser viewport to a narrow mobile-sized width. 2. Inspect product cards, sorting and cart navigation. | Viewport: 375 × 667 | Main controls remain usable, and content does not overlap or become inaccessible. | P2 | No — manual visual review is appropriate for this assessment. |
| TC24 | Exploratory Testing | Exploratory | Explore known-problem user behaviour | A Sauce Demo user documented as having known problems is available | 1. Log in with the designated user. 2. Explore product sorting, cart operations and checkout for 15 minutes. 3. Record unexpected behaviour and evidence. | `problem_user` / `secret_sauce` | Unexpected behaviour is documented with reproducible steps, actual results and screenshots where relevant. | P2 | No — exploratory testing relies on human observation and investigation. |
| TC25 | Checkout | Boundary | Verify checkout with a single product | User is logged in and has exactly one product in the cart | 1. Proceed through checkout with valid information. 2. Verify the overview totals. 3. Finish the order. | One low-priced product | The item subtotal matches that product's price, tax and grand total are consistent, and the order completes successfully. | P2 | Yes — validates single-item checkout calculations. |

### TC24 – Exploratory Testing Charter: Problem User Behaviour

**Objective:**  
Explore the behaviour of the Sauce Demo application when using the `problem_user` account. Identify unexpected UI behaviour, incorrect product information, broken interactions, and issues that could affect the shopping and checkout experience.

**Timebox:** 15 minutes

**Preconditions:**
- The Sauce Demo application is accessible.
- The user is logged out.
- The `problem_user` account is available.

**Test Data:**
- **Username:** `problem_user`
- **Password:** `secret_sauce`

**Exploration Areas:**
1. Log in and observe whether the login process behaves as expected.
2. Inspect product names, images, descriptions, and prices on the inventory page.
3. Verify that product sorting works correctly.
4. Add and remove products from the cart, checking the cart badge and product details.
5. Navigate between the inventory page and shopping cart.
6. Proceed through checkout and observe form validation and order summary behaviour.
7. Record any inconsistent behaviour, UI defects, errors, or unexpected results.

**Execution Approach:**  
Explore the application freely within the 15-minute timebox, prioritising the main shopping journey. Record the steps to reproduce each issue and capture screenshots or other relevant evidence.

**Expected Outcome:**  
The application should allow the user to navigate the shopping journey without unexpected errors. Any incorrect product information, sorting behaviour, cart updates, checkout behaviour, or UI inconsistencies should be documented as defects.

**Automation:** No — exploratory testing is performed manually to discover unexpected behaviour that predefined test cases may not cover.

**Deliverables:**  
Exploration notes, discovered defects, reproduction steps, and supporting evidence.


## 3. Test Strategy

I would automate critical end-to-end workflows at the UI layer using Playwright, including login, sorting, cart operations, checkout validation, order totals, order completion and protected-page access. These tests verify the customer journey and visible application behaviour. If API or unit-level access is available, I would test business rules, input validation, tax calculations and order processing at those layers for faster and more focused feedback. Accessibility, responsive layout, cross-browser appearance and exploratory testing would include manual checks, supplemented by automated accessibility and compatibility tools where appropriate. The biggest remaining risk is incorrect order processing or price calculations that are not fully covered by the available test environment, particularly if the UI displays correct totals while backend order data is incorrect.