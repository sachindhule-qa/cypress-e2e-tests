// =============================================
// products.cy.js - Products Page E2E Tests
// Author: Sachin Dhule
// =============================================

import ProductsPage from '../../pages/ProductsPage';

describe('Products Page Functionality', () => {

  beforeEach(() => {
    cy.loginWithFixture('validUser');
  });

  it('TC_PRODUCTS_001 - Verify products page loads after login', () => {
    ProductsPage.verifyProductsPage();
    cy.url().should('include', '/inventory.html');
  });

  it('TC_PRODUCTS_002 - Verify 6 products are displayed', () => {
    cy.fixture('products').then((products) => {
      ProductsPage.getProductCount().should('eq', products.expectedProductCount);
    });
  });

  it('TC_PRODUCTS_003 - Verify product names are visible', () => {
    ProductsPage.productNames.each(($name) => {
      cy.wrap($name).should('be.visible').and('not.be.empty');
    });
  });

  it('TC_PRODUCTS_004 - Verify product prices are displayed', () => {
    ProductsPage.productPrices.each(($price) => {
      cy.wrap($price)
        .should('be.visible')
        .invoke('text')
        .should('match', /^\$\d+\.\d{2}$/);
    });
  });

  it('TC_PRODUCTS_005 - Verify add single product to cart', () => {
    ProductsPage.addFirstProductToCart();
    ProductsPage.verifyCartCount(1);
  });

  it('TC_PRODUCTS_006 - Verify add multiple products to cart', () => {
    ProductsPage.addMultipleToCart(3);
    ProductsPage.verifyCartCount(3);
  });

  it('TC_PRODUCTS_007 - Verify add specific product by name', () => {
    cy.fixture('products').then((products) => {
      cy.addToCart(products.firstProduct);
      cy.verifyCartCount(1);
    });
  });

  it('TC_PRODUCTS_008 - Verify sort by Name A-Z', () => {
    cy.fixture('products').then((products) => {
      ProductsPage.sortBy(products.sortOptions.nameAZ);
      ProductsPage.verifyFirstProductName('Sauce Labs Backpack');
    });
  });

  it('TC_PRODUCTS_009 - Verify sort by Name Z-A', () => {
    cy.fixture('products').then((products) => {
      ProductsPage.sortBy(products.sortOptions.nameZA);
      ProductsPage.verifyFirstProductName('Test.allTheThings() T-Shirt (Red)');
    });
  });

  it('TC_PRODUCTS_010 - Verify sort by Price Low to High', () => {
    cy.fixture('products').then((products) => {
      ProductsPage.sortBy(products.sortOptions.priceLowHigh);
      ProductsPage.productPrices.first()
        .invoke('text')
        .then((price) => {
          expect(parseFloat(price.replace('$', ''))).to.be.lessThan(10);
        });
    });
  });

  it('TC_PRODUCTS_011 - Verify cart is empty on fresh login', () => {
    ProductsPage.verifyCartEmpty();
  });

  it('TC_PRODUCTS_012 - Verify clicking product opens detail page', () => {
    cy.fixture('products').then((products) => {
      cy.contains('.inventory_item_name', products.firstProduct).click();
      cy.url().should('include', '/inventory-item.html');
      cy.get('.inventory_details_name').should('contain', products.firstProduct);
    });
  });

});
