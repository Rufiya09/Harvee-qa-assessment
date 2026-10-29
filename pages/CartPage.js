
export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }

  async removeProduct(productName) {
    const product = this.cartItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    await product.getByRole('button', { name: 'Remove' }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
