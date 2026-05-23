# 🌲 Cypress E2E Testing Framework

![Cypress](https://img.shields.io/badge/Cypress-13.7-04C38E?style=flat-square&logo=cypress)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![Node](https://img.shields.io/badge/Node-18+-green?style=flat-square&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

A production-grade **End-to-End Testing Framework** built with **Cypress + JavaScript** using the **Page Object Model (POM)** design pattern. Covers Login, Products, Cart, and full Checkout flows with custom commands, fixtures, screenshots, and video recording.

---

## 📁 Project Structure

```
cypress-e2e-tests/
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── login.cy.js           # 8 Login test cases
│   │   ├── products/
│   │   │   └── products.cy.js        # 12 Products test cases
│   │   └── cart/
│   │       └── cart.cy.js            # 10 Cart & Checkout tests
│   ├── fixtures/
│   │   ├── users.json                # Test user data
│   │   └── products.json             # Product test data
│   ├── pages/
│   │   ├── LoginPage.js              # POM - Login
│   │   ├── ProductsPage.js           # POM - Products
│   │   └── CartPage.js               # POM - Cart & Checkout
│   └── support/
│       ├── commands.js               # 6 Custom Cypress commands
│       └── e2e.js                    # Global setup
├── cypress.config.js                 # Cypress configuration
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Cypress | 13.7.0 | E2E test automation |
| JavaScript | ES6+ | Programming language |
| Node.js | 18+ | Runtime |
| Mochawesome | 7.1.3 | HTML reporting |
| Page Object Model | — | Design pattern |

---

## ✅ Test Coverage

| Module | Test Cases | Coverage |
|--------|-----------|---------|
| Login / Auth | 8 | Valid, Invalid, Locked, Empty fields |
| Products Page | 12 | Count, Sort, Add to cart, Details |
| Cart & Checkout | 10 | Add, Remove, Full checkout flow |
| **Total** | **30** | |

---

## 🚀 How to Run

### Prerequisites
- Node.js 18+
- npm

### Install dependencies
```bash
npm install
```

### Open Cypress Test Runner (Interactive)
```bash
npm run cy:open
```

### Run all tests (Headless)
```bash
npm run cy:run
```

### Run on specific browser
```bash
npm run cy:run:chrome
npm run cy:run:firefox
```

### Run specific module
```bash
npm run cy:run:auth
npm run cy:run:products
npm run cy:run:cart
```

---

## 🎯 Custom Commands

| Command | Usage |
|---------|-------|
| `cy.login(user, pass)` | Login with credentials |
| `cy.loginWithFixture('validUser')` | Login using fixture data |
| `cy.addToCart('Product Name')` | Add product to cart |
| `cy.verifyCartCount(2)` | Assert cart badge count |
| `cy.completeCheckout(fn, ln, zip)` | Full checkout in one command |
| `cy.logout()` | Logout and verify redirect |

---

## 📊 Reports & Screenshots

After test run:
- **HTML Report** → `cypress/reports/`
- **Screenshots** (on failure) → `cypress/screenshots/`
- **Video Recording** → `cypress/videos/`

---

## ⚙️ Configuration

Edit `cypress.config.js`:
```javascript
baseUrl: "https://www.saucedemo.com",
viewportWidth: 1280,
viewportHeight: 720,
defaultCommandTimeout: 10000,
retries: { runMode: 1, openMode: 0 }
```

---

## 🎯 Key Features

- **Page Object Model** — Clean separation of locators and test logic
- **Custom Commands** — Reusable cy commands for common actions
- **Fixtures** — External JSON test data management
- **Screenshot on Failure** — Auto-captures failed test screenshots
- **Video Recording** — Full test execution videos
- **Retry on Failure** — Auto-retry flaky tests in CI
- **Cross-browser** — Chrome, Firefox, Edge support
- **Mochawesome Reports** — Beautiful HTML test reports

---

## 👨‍💻 Author

**Sachin Dhule** — QA Automation Engineer  
📍 Pune, Maharashtra, India  
🔗 [LinkedIn](https://linkedin.com/in/sachindhule) | [GitHub](https://github.com/sachindhule-qa)

---

## 📄 License

This project is licensed under the MIT License.
