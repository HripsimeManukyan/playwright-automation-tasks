
# Playwright Automation Framework – TutorialsNinja Demo

![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-45ba4b?logo=playwright)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-5FA04E?logo=node.js)
![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen?logo=githubactions)
![License](https://img.shields.io/badge/License-MIT-blue)

This repository contains **end-to-end test automation scripts** written in **Playwright (TypeScript)** for the [TutorialsNinja Demo](https://tutorialsninja.com/demo/) e-commerce application.

---

## 📌 Features

* 🔑 **Authentication Tests** – Login, Logout, Invalid Credentials
* 🔒 **Change Password Tests** – Positive and Negative scenarios
* 🛒 **Shopping Cart Tests** – Add, remove, validate multiple items
* 💱 **Currency Switch Tests** – Verify currency changes across the site
* 🔍 **Search Functionality Tests** – Search by product, edge cases
* 🖥️ **UI/Navigation Tests** – Desktop navigation and menu validation

---

## 📂 Project Structure

```
tests/
 ├── addToCart.spec.ts         # Cart functionality tests
 ├── changePassword.spec.ts    # Change password tests
 ├── changePassword2.spec.ts   # Additional negative password tests
 ├── currency.spec.ts          # Currency switch tests
 ├── desktop.spec.ts           # UI/Desktop navigation tests
 ├── login.spec.ts             # Login/logout tests
 └── search.spec.ts            # Product search tests

playwright.config.ts           # Playwright configuration
package.json                   # Project dependencies & scripts
```

---

## ⚙️ Tech Stack

* [Playwright](https://playwright.dev/) – Browser automation
* [TypeScript](https://www.typescriptlang.org/) – Strong typing for maintainability
* [Node.js](https://nodejs.org/) – Runtime environment

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/playwright-automation-tutorialsninja.git
cd playwright-automation-tutorialsninja
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Tests

Run all tests:

```bash
npx playwright test
```

Run in headed mode (see the browser):

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/changePassword.spec.ts
```

### 4️⃣ Generate Report

```bash
npx playwright show-report
```

---

## 📊 Test Reporting

* HTML test reports are auto-generated under `playwright-report/`.
* Open the latest report with:

  ```bash
  npx playwright show-report
  ```

---

## 🧪 Example Test Flow – Change Password

1. Login with valid credentials
2. Navigate to “Change Password” page
3. Update password with valid and invalid data sets
4. Verify success/error messages
5. Re-login with updated credentials

---

Would you like me to also include a **workflow badge** (CI/CD badge from GitHub Actions) so it shows your test results live whenever someone visits your repo?
