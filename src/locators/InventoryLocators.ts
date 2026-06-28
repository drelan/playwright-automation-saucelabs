export const InventoryLocators = {
  // Page header
  pageTitle:          '.title',

  // Sorting
  sortDropdown:       '[data-test="product-sort-container"]',

  // Product list
  inventoryContainer: '[data-test="inventory-container"]',
  inventoryItems:     '[data-test="inventory-item"]',
  productName:        '[data-test="inventory-item-name"]',
  productDescription: '[data-test="inventory-item-desc"]',
  productPrice:       '[data-test="inventory-item-price"]',
  productImage:       '.inventory_item_img img',

  // Dynamic add/remove buttons (parameterized)
  addToCartButton:    (itemName: string) =>
    `[data-test="add-to-cart-${itemName.toLowerCase().replace(/\s+/g, '-')}"]`,
  removeButton:       (itemName: string) =>
    `[data-test="remove-${itemName.toLowerCase().replace(/\s+/g, '-')}"]`,

  // Cart badge
  cartBadge:          '[data-test="shopping-cart-badge"]',
  cartIcon:           '[data-test="shopping-cart-link"]',
} as const;
