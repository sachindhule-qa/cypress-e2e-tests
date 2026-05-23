// =============================================
// e2e.js - Global Support File & Custom Commands
// Author: Sachin Dhule
// =============================================

import './commands';

// Hide fetch/XHR requests from command log
const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Global before each - clear cookies and local storage
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
