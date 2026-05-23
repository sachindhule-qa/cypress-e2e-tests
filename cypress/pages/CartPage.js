// =============================================
// CartPage.js - Page Object for Cart Page
// Author: Sachin Dhule
// =============================================

class CartPage {
  // Locators
  get pageTitle()        { return cy.get('.title'); }
  get cartItems()        { return cy.get('.cart_item'); }
  get cartItemNames()    { return cy.get('.inventory_item_name'); }
  get cartItemPrices()   { return cy.get('.inventory_item_price'); }
  get removeButtons()    { return cy.get('[data-test^="remove"]'); }
  get checkoutButton()   { return cy.get('[data-test="checkout"]'); }
  get continueButton()   { return cy.get('[data-test="continue-shopping"]'); }

  // Checkout page locators
  get firstNameField()   { return cy.get('[data-test="firstName"]'); }
  get lastNameField()    { return cy.get('[data-test="lastName"]'); }
  get postalCodeField()  { return cy.get('[data-test="postalCode"]'); }
  get continueCheckout() { return cy.get('[data-test="continue"]'); }
  get finishButton()     { return cy.get('[data-test="finish"]'); }
  get confirmHeader()    { return cy.get('.complete-header'); }
  get confirmText()      { return cy.get('.complete-text'); }

  // Actions
  verifyCartPage() {
    this.pageTitle.should('have.text', 'Your Cart');
    return this;
  }

  getCartItemCount() {
    return this.cartItems.its('length');
  }

  removeFirstItem() {
    this.removeButtons.first().click();
    return this;
  }

  removeItemByName(productName) {
    cy.contains('.cart_item', productName)
      .find('[data-test^="remove"]')
      .click();
    return this;
  }

  clickCheckout() {
    this.checkoutButton.click();
    return this;
  }

  fillCheckoutInfo(firstName, lastName, postalCode) {
    this.firstNameField.type(firstName);
    this.lastNameField.type(lastName);
    this.postalCodeField.type(postalCode);
    return this;
  }

  clickContinueCheckout() {
    this.continueCheckout.click();
    return this;
  }

  clickFinish() {
    this.finishButton.click();
    return this;
  }

  verifyOrderConfirmation() {
    this.confirmHeader.should('have.text', 'Thank you for your order!');
    return this;
  }

  continueShopping() {
    this.continueButton.click();
    return this;
  }
}

export default new CartPage();
