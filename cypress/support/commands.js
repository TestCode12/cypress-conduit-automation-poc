// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// cypress/support/commands.ts

declare namespace Cypress {
  interface Chainable {
    /**
     * Programmatic API login bypass (App Action/API Bypass pattern)
     * Avoids UI clicking overhead to set up state instantly.
     */
    loginByAPI(email: string, pass: string): Chainable<void>;
  }
}

Cypress.Commands.add('loginByAPI', (email: string, pass: string) => {
  cy.request({
    method: 'POST',
    url: 'https://realworld.io', // Conduit production API endpoint
    body: {
      user: {
        email: email,
        password: pass
      }
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    
    // Inject the authentication token directly into the browser memory
    const { token, username } = response.body.user;
    window.localStorage.setItem('jwtToken', token);
    
    // Optional: Log token retrieval inside the Cypress command log interface
    Cypress.log({
      name: 'API Login Bypass',
      message: `Authenticated successfully as ${username}`
    });
  });
});
