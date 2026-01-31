# Playwright Automation

A scalable end-to-end test automation framework built with **Playwright** and **JavaScript** for reliable web application testing.

This project follows industry best practices such as **Page Object Model (POM)**, clean test structure, and reusable utilities to ensure maintainability and scalability.

## 🚀 Tech Stack
- Playwright
- JavaScript (Node.js)
- npm

---

## 🔹 Features
- Web automation using **Playwright (JavaScript)**
- **Page Object Model (POM)** design for maintainable code
- Clean test structure and reusable components
- Test tagging support (`@smoke`, `@regression`, etc.)
- Run tests in **headed** or **headless** mode
- Integrated with **GitHub Actions** for CI/CD

---

## 📁 Project Structure
playwright-automation/
├── tests/ # Test specs
│ ├── auth/
│ │ └── login.spec.js
│ └── home/
│ └── home.spec.js
│
├── pages/ # Page Object Models
│ ├── login.page.js
│ └── home.page.js
│
├── utils/ # Utilities & helpers
│ └── test-data.js
│
├── fixtures/ # Static test data (optional)
│
├── playwright.config.js # Playwright configuration
├── package.json
├── README.md
└── .gitignore

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
 - git clone https://github.com/Madhukar2525/playwright-automation.git
 - cd playwright-automation

### 2️⃣ Install Dependencies
 - npm install

### 3️⃣ Install Playwright Browsers
 - npx playwright install

### ▶️ Running Tests
- Run All Tests
 - npm run test

- Run Tests in Headed Mode
 - npm run test --headed

- Run a Specific Test File
 - npm run test tests/auth/login.spec.js

- Run Tests in a Specific Browser
 - npm run test --project=chromium
 - npm run test --project=firefox
 - npm run test --project=webkit

- Run Tests with specific tag
 - npm run test -- -g "@tag_name"

- Run Tests in Debug Mode
 - npm run test --debug

