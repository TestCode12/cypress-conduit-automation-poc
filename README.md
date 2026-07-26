# Advanced Enterprise E2E Test Automation Architecture (Conduit PoC)

This production-ready quality assurance framework is built entirely from scratch utilizing **Cypress** and **TypeScript**. It is specifically structured to showcase optimal hybrid engineering principles on single-page web applications.

## 📐 Architecture Strategies & Design Decisions

### 1. Hybrid Optimization Engine (POM + App Actions)
* **Page Object Model (POM):** Applied to isolate changing UI element trees and locators from programmatic code logic.
* **App Actions (API Bypass):** Leverages a low-overhead custom command (`cy.loginByAPI()`) hitting endpoints programmatically to skip repetitive login UI patterns. This approach dramatically increases pipeline efficiency.

### 2. Semantic Element Targeting
Since the underlying open-source application lacks isolated `data-cy` or `data-test` markup tags, locators are engineered using structural semantic parameters (`input[type="email"]`) and text property arrays to maximize test resilience against styling refactors.

### 3. Integrated Cloud Infrastructure
Integrated with **GitHub Actions CI/CD workflows** to execute complete headless regressions inside isolated Chromium containers upon code merge activities.
