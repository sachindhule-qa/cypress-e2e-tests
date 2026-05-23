// =============================================
// ProductsPage.js - Page Object for Products Page
// Author: Sachin Dhule
// =============================================

class ProductsPage {
  // Locators
  get pageTitle()         { return cy.get('.title'); }
  get productItems()      { return cy.get('.inventory_item'); }
  get productNames()      { return cy.get('.inventory_item_name'); }
  get productPrices()     { return cy.get('.inventory_item_price'); }
  get addToCartButtons()  { return cy.get('[data-test^="add-to-cart"]'); }
  get cartIcon()          { return cy.get('.shopping_cart_link'); }
  get cartBadge()         { return cy.get('.shopping_cart_badge'); }
  get sortDropdown()      { return cy.get('[data-test="product_sort_container"]'); }
  get menuButton()        { return cy.get('#react-burger-menu-btn'); }
  get logoutLink()        { return cy.get('#logout_sidebar_link'); }
  get burgerMenu()        { return cy.get('.bm-menu-wrap'); }

  // Actions
  verifyProductsPage() {
    this.pageTitle.should('be.visible').and('have.text', 'Products');
    return this;
  }

  getProductCount() {
    return this.productItems.its('length');
  }

  addToCartByName(productName) {
    cy.contains('.inventory_item', productName)
      .find('[data-test^="add-to-cart"]')
      .click();
    return this;
  }

  addFirstProductToCart() {
    this.addToCartButtons.first().click();
    return this;
  }

  addMultipleToCart(count) {
    this.addToCartButtons.each(($btn, index) => {
      if (index < count) cy.wrap($btn).click();
    });
    return this;
  }

  verifyCartCount(count) {
    this.cartBadge.should('have.text', String(count));
    return this;
  }

  verifyCartEmpty() {
    this.cartBadge.should('not.exist');
    return this;
  }

  sortBy(option) {
    this.sortDropdown.select(option);
    return this;
  }

  goToCart() {
    this.cartIcon.click();
    return this;
  }

  logout() {
    this.menuButton.click();
    cy.get('#logout_sidebar_link').should('be.visible').click();
    return this;
  }

  verifyFirstProductName(name) {
    this.productNames.first().should('have.text', name);
    return this;
  }
}

export default new ProductsPage();
