// =============================================
// commands.js - Custom Cypress Commands
// Author: Sachin Dhule
// =============================================

/**
 * Custom command: Login to SauceDemo
 * Usage: cy.login('standard_user', 'secret_sauce')
 */
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('[data-test="username"]').clear().type(username);
  cy.get('[data-test="password"]').clear().type(password);
  cy.get('[data-test="login-button"]').click();
  cy.url().should('include', '/inventory.html');
});

/**
 * Custom command: Login using fixture data
 * Usage: cy.loginWithFixture('validUser')
 */
Cypress.Commands.add('loginWithFixture', (userType = 'validUser') => {
  cy.fixture('users').then((users) => {
    cy.login(users[userType].username, users[userType].password);
  });
});

/**
 * Custom command: Add product to cart by name
 * Usage: cy.addToCart('Sauce Labs Backpack')
 */
Cypress.Commands.add('addToCart', (productName) => {
  cy.contains('.inventory_item', productName)
    .find('[data-test^="add-to-cart"]')
    .click();
});

/**
 * Custom command: Verify cart badge count
 * Usage: cy.verifyCartCount(2)
 */
Cypress.Commands.add('verifyCartCount', (count) => {
  cy.get('.shopping_cart_badge').should('have.text', String(count));
});

/**
 * Custom command: Complete full checkout flow
 * Usage: cy.completeCheckout('Sachin', 'Dhule', '411001')
 */
Cypress.Commands.add('completeCheckout', (firstName, lastName, postalCode) => {
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
  cy.get('.complete-header').should('have.text', 'Thank you for your order!');
});

/**
 * Custom command: Logout
 */
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
  cy.url().should('eq', Cypress.config('baseUrl') + '/');
});

/**
 * Custom command: Take named screenshot
 */
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name, { capture: 'fullPage' });
});
