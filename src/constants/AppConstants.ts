export const AppConstants = {
  URLS: {
    LOGIN:              '/',
    INVENTORY:          '/inventory.html',
    CART:               '/cart.html',
    CHECKOUT_STEP_ONE:  '/checkout-step-one.html',
    CHECKOUT_STEP_TWO:  '/checkout-step-two.html',
    CHECKOUT_COMPLETE:  '/checkout-complete.html',
  },

  TITLES: {
    PRODUCTS:   'Products',
    CART:       'Your Cart',
    CHECKOUT_1: 'Checkout: Your Information',
    CHECKOUT_2: 'Checkout: Overview',
    COMPLETE:   'Checkout: Complete!',
  },

  MESSAGES: {
    ORDER_COMPLETE:    'Thank you for your order!',
    LOCKED_USER_ERROR: 'Epic sadface: Sorry, this user has been locked out.',
    MISSING_USERNAME:  'Epic sadface: Username is required',
    MISSING_PASSWORD:  'Epic sadface: Password is required',
    INVALID_CREDS:     'Epic sadface: Username and password do not match any user in this service',
    MISSING_FIRSTNAME: 'Error: First Name is required',
    MISSING_LASTNAME:  'Error: Last Name is required',
    MISSING_ZIPCODE:   'Error: Postal Code is required',
  },

  SORT_OPTIONS: {
    NAME_ASC:    'az',
    NAME_DESC:   'za',
    PRICE_ASC:   'lohi',
    PRICE_DESC:  'hilo',
  },

  TIMEOUTS: {
    SHORT:   5000,
    MEDIUM:  15000,
    LONG:    30000,
  },
} as const;
