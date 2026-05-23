// =============================================
// cart.cy.js - Cart & Checkout E2E Tests
// Author: Sachin Dhule
// =============================================

import CartPage from '../../pages/CartPage';

describe('Cart & Checkout Functionality', () => {

  beforeEach(() => {
    cy.loginWithFixture('validUser');
  });

  it('TC_CART_001 - Verify cart page loads correctly', () => {
    cy.get('.shopping_cart_link').click();
    CartPage.verifyCartPage();
    cy.url().should('include', '/cart.html');
  });

  it('TC_CART_002 - Verify empty cart has no items', () => {
    cy.get('.shopping_cart_link').click();
    CartPage.cartItems.should('not.exist');
  });

  it('TC_CART_003 - Verify added product appears in cart', () => {
    cy.fixture('products').then((products) => {
      cy.addToCart(products.firstProduct);
      cy.get('.shopping_cart_link').click();
      CartPage.verifyCartPage();
      CartPage.cartItemNames.should('contain', products.firstProduct);
    });
  });

  it('TC_CART_004 - Verify cart item count matches added products', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.addToCart('Sauce Labs Bike Light');
    cy.verifyCartCount(2);
    cy.get('.shopping_cart_link').click();
    CartPage.getCartItemCount().should('eq', 2);
  });

  it('TC_CART_005 - Verify removing item from cart', () => {
    cy.fixture('products').then((products) => {
      cy.addToCart(products.firstProduct);
      cy.get('.shopping_cart_link').click();
      CartPage.removeFirstItem();
      CartPage.cartItems.should('not.exist');
    });
  });

  it('TC_CART_006 - Verify cart badge disappears after removing all items', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.verifyCartCount(1);
    cy.get('.shopping_cart_link').click();
    CartPage.removeFirstItem();
    cy.get('.shopping_cart_badge').should('not.exist');
  });

  it('TC_CART_007 - Verify continue shopping returns to products page', () => {
    cy.get('.shopping_cart_link').click();
    CartPage.continueShopping();
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('TC_CART_008 - Verify complete checkout flow end to end', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    CartPage.clickCheckout();
    CartPage
      .fillCheckoutInfo('Sachin', 'Dhule', '411001')
      .clickContinueCheckout();
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.summary_total_label').should('be.visible');
    CartPage.clickFinish();
    CartPage.verifyOrderConfirmation();
    cy.takeScreenshot('order-confirmation');
  });

  it('TC_CART_009 - Verify checkout fails with empty first name', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    CartPage.clickCheckout();
    CartPage
      .fillCheckoutInfo('', 'Dhule', '411001')
      .clickContinueCheckout();
    cy.get('[data-test="error"]').should('contain', 'First Name is required');
  });

  it('TC_CART_010 - Verify checkout summary shows correct total', () => {
    cy.addToCart('Sauce Labs Backpack');
    cy.get('.shopping_cart_link').click();
    CartPage.clickCheckout();
    CartPage
      .fillCheckoutInfo('Sachin', 'Dhule', '411001')
      .clickContinueCheckout();
    cy.get('.summary_subtotal_label').should('be.visible');
    cy.get('.summary_tax_label').should('be.visible');
    cy.get('.summary_total_label').should('be.visible');
  });

});
