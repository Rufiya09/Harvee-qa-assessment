
export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  
  async getProductPrices() {
    const prices = await this.page.locator('.inventory_item_price').allTextContents();
    return prices.map(price => Number(price.replace('$', '')));
  }


  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async addProduct(productName) {
    const product = this.inventoryItems.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  
  async logout() {
    await this.page.locator('#react-burger-menu-btn').click();
    await this.page.locator('#logout_sidebar_link').click();
  }

}
