// cypress/support/index.d.ts

import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Programmatic API login bypass (App Action/API Bypass pattern)
       * Avoids UI clicking overhead to set up state instantly.
       * @example cy.loginByAPI('user@domain.com', 'password123')
       */
      loginByAPI(email: string, pass: string): Chainable<void>;
    }
  }
}
