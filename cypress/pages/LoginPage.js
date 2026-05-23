// =============================================
// LoginPage.js - Page Object for Login Page
// Author: Sachin Dhule
// =============================================

class LoginPage {
  // Locators
  get usernameField()  { return cy.get('[data-test="username"]'); }
  get passwordField()  { return cy.get('[data-test="password"]'); }
  get loginButton()    { return cy.get('[data-test="login-button"]'); }
  get errorMessage()   { return cy.get('[data-test="error"]'); }
  get errorIcon()      { return cy.get('.error-button'); }

  // Actions
  visit() {
    cy.visit('/');
    return this;
  }

  enterUsername(username) {
    this.usernameField.clear().type(username);
    return this;
  }

  enterPassword(password) {
    this.passwordField.clear().type(password);
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    return this;
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
    return this;
  }

  // Using fixture data
  loginWithFixture(userType = 'validUser') {
    cy.fixture('users').then((users) => {
      this.login(users[userType].username, users[userType].password);
    });
    return this;
  }

  // Verifications
  verifyErrorMessage(message) {
    this.errorMessage.should('be.visible').and('contain.text', message);
    return this;
  }

  verifyLoginPageVisible() {
    this.loginButton.should('be.visible');
    return this;
  }

  verifyErrorIconVisible() {
    this.errorIcon.should('be.visible');
    return this;
  }
}

export default new LoginPage();
