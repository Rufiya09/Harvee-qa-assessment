import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { users, password } from '../test-data/users.js';


test('TC01 - Standard user can log in successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, password);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});


test('TC02 - Locked-out user cannot log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.lockedOut.username, password);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    'Sorry, this user has been locked out'
  );

  await expect(page).not.toHaveURL(/inventory\.html/);
});


test('TC08 - Products are sorted by price from low to high', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, password);

  await expect(page.locator('.inventory_list')).toBeVisible();

  await inventoryPage.sortByPriceLowToHigh();

  const prices = await inventoryPage.getProductPrices();

  expect(prices.length).toBeGreaterThan(0);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});


test('TC12 - Remove one of two products from the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, password);

  await inventoryPage.addProduct('Sauce Labs Backpack');
  await inventoryPage.addProduct('Sauce Labs Bike Light');

  await expect(inventoryPage.cartBadge).toHaveText('2');

  await inventoryPage.openCart();

  await cartPage.removeProduct('Sauce Labs Backpack');

  await expect(cartPage.cartItems).toHaveCount(1);
  await expect(
    page.locator('.cart_item').getByText('Sauce Labs Bike Light')
  ).toBeVisible();

  await expect(page.locator('.cart_item').getByText('Sauce Labs Backpack'))
    .toHaveCount(0);

  await expect(cartPage.cartBadge).toHaveText('1');
});

const missingCheckoutFields = [
  { field: 'first name', firstName: '', lastName: 'Doe', postalCode: '12345' },
  { field: 'last name', firstName: 'Jane', lastName: '', postalCode: '12345' },
  { field: 'postal code', firstName: 'Jane', lastName: 'Doe', postalCode: '' },
];


for (const data of missingCheckoutFields) {
  test(`TC17 - Checkout rejects missing ${data.field}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, password);

    await inventoryPage.addProduct('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.enterCustomerDetails(
      data.firstName,
      data.lastName,
      data.postalCode
    );

    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText(
      data.field === 'postal code'
        ? 'Postal Code is required'
        : `${data.field === 'first name' ? 'First Name' : 'Last Name'} is required`
    );
  });
}


test('TC18 - Checkout total equals item subtotal plus tax', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, password);

  await inventoryPage.addProduct('Sauce Labs Backpack');
  await inventoryPage.addProduct('Sauce Labs Bike Light');

  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutPage.enterCustomerDetails('Jane', 'Doe', '12345');
  await checkoutPage.continueToOverview();

  const subtotalText = await checkoutPage.itemTotal.textContent();
  const taxText = await checkoutPage.tax.textContent();
  const totalText = await checkoutPage.total.textContent();

  const subtotal = Number(subtotalText.match(/\$([\d.]+)/)[1]);
  const tax = Number(taxText.match(/\$([\d.]+)/)[1]);
  const total = Number(totalText.match(/\$([\d.]+)/)[1]);

  // Verify the expected subtotal of both products
  expect(subtotal).toBeCloseTo(39.98, 2);

  // Verify the grand total equals subtotal plus tax
  expect(total).toBeCloseTo(subtotal + tax, 2);
});


test('TC20 - Complete checkout and verify order confirmation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, password);

  await inventoryPage.addProduct('Sauce Labs Backpack');
  await inventoryPage.openCart();
  await cartPage.checkout();

  await checkoutPage.enterCustomerDetails('Jane', 'Doe', '12345');
  await checkoutPage.continueToOverview();

  await checkoutPage.finishCheckout();

  await expect(checkoutPage.confirmationMessage).toHaveText(
    'Thank you for your order!'
  );

  await page.locator('.shopping_cart_link').click();
  await expect(page.locator('.cart_item')).toHaveCount(0);
});


test('TC21 - Logged-out user cannot access the products page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, password);

  await expect(page).toHaveURL(/inventory\.html/);

  await inventoryPage.logout();

  await page.goto('/inventory.html');

  await expect(page).not.toHaveURL(/inventory\.html/);
  await expect(loginPage.loginButton).toBeVisible();
});


test('B1 - Cart grand total equals subtotal plus tax', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(users.standard.username, password);

  await expect(page).toHaveURL(/inventory\.html/);

  await inventoryPage.addProduct('Sauce Labs Backpack');
  await inventoryPage.openCart();

  await expect(cartPage.cartItems).toHaveCount(1);

  await cartPage.checkout();
  await checkoutPage.enterCustomerDetails('Jane', 'Doe', '12345');
  await checkoutPage.continueToOverview();

  const subtotalText = await checkoutPage.itemTotal.textContent();
  const taxText = await checkoutPage.tax.textContent();
  const totalText = await checkoutPage.total.textContent();

  const subtotal = Number(subtotalText.match(/[\d.]+$/)[0]);
  const tax = Number(taxText.match(/[\d.]+$/)[0]);
  const total = Number(totalText.match(/[\d.]+$/)[0]);

  // Verify the expected price of the Sauce Labs Backpack
  expect(subtotal).toBeCloseTo(29.99, 2);
  expect(tax).toBeGreaterThanOrEqual(0);
  expect(total).toBeCloseTo(subtotal + tax, 2);
});
