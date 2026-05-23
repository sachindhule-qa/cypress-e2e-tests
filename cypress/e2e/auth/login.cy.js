// =============================================
// login.cy.js - Login E2E Test Cases
// Author: Sachin Dhule
// Application: SauceDemo
// =============================================

import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';

describe('Login Functionality', () => {

  beforeEach(() => {
    LoginPage.visit();
  });

  it('TC_LOGIN_001 - Verify login page loads correctly', () => {
    LoginPage.verifyLoginPageVisible();
    cy.title().should('eq', 'Swag Labs');
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
  });

  it('TC_LOGIN_002 - Verify successful login with valid credentials', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.validUser.username, users.validUser.password);
    });
    cy.url().should('include', '/inventory.html');
    ProductsPage.verifyProductsPage();
  });

  it('TC_LOGIN_003 - Verify login fails with invalid credentials', () => {
    cy.fixture('users').then((users) => {
      LoginPage
        .enterUsername(users.invalidUser.username)
        .enterPassword(users.invalidUser.password)
        .clickLogin();
    });
    LoginPage.verifyErrorMessage('Username and password do not match');
  });

  it('TC_LOGIN_004 - Verify error for empty username', () => {
    LoginPage
      .enterUsername('')
      .enterPassword('secret_sauce')
      .clickLogin();
    LoginPage.verifyErrorMessage('Username is required');
  });

  it('TC_LOGIN_005 - Verify error for empty password', () => {
    LoginPage
      .enterUsername('standard_user')
      .enterPassword('')
      .clickLogin();
    LoginPage.verifyErrorMessage('Password is required');
  });

  it('TC_LOGIN_006 - Verify locked out user cannot login', () => {
    cy.fixture('users').then((users) => {
      LoginPage.login(users.lockedUser.username, users.lockedUser.password);
    });
    LoginPage.verifyErrorMessage('Sorry, this user has been locked out');
  });

  it('TC_LOGIN_007 - Verify error icon is displayed on failed login', () => {
    LoginPage
      .enterUsername('wrong')
      .enterPassword('wrong')
      .clickLogin();
    LoginPage.verifyErrorIconVisible();
    cy.takeScreenshot('login-error-icon');
  });

  it('TC_LOGIN_008 - Verify logout redirects to login page', () => {
    cy.loginWithFixture('validUser');
    cy.logout();
    LoginPage.verifyLoginPageVisible();
  });

});
