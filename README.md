# Playwright Automation

A scalable end-to-end test automation framework built with **Playwright** and **JavaScript** for reliable web application testing.

This project follows industry best practices such as **Page Object Model (POM)**, clean test structure, and reusable utilities to ensure maintainability and scalability.

## 🚀 Tech Stack
- Playwright
- JavaScript (Node.js)
- npm


## ⚙️ Setup Instructions

## Branches:
- develop → Production-ready Playwright framework using POM & fixtures
- playwright-practice → Learning branch with raw Playwright test cases for API practice

### 1️⃣ Clone the Repository
git clone https://github.com/Madhukar2525/playwright-automation.git
cd playwright-automation

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Install Playwright Browsers
npx playwright install

### ▶️ Running Tests
- Run All Tests
npx playwright test

-Run Tests in Headed Mode
npx playwright test --headed

-Run a Specific Test File
npx playwright test tests/auth/login.spec.js

-Run Tests in a Specific Browser
npx playwright test --project=chromium

-Run Tests in Debug Mode
npx playwright test --debug