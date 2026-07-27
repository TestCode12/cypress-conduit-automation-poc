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
import { API_URL } from './constants';


Cypress.Commands.add('signupByAPI', (username: string, email: string, pass: string) => {
  return cy.request({
    method: 'POST',
    url: `${API_URL}/api/users`,
    failOnStatusCode: false,
    body: { user: { username, email, password: pass } }
  }).then((response) => {
    if (response.status === 201 || response.status === 200) {
      const { token } = response.body.user;
      window.localStorage.setItem('jwtToken', token);
    }
  });
});

Cypress.Commands.add('loginByAPI', (email: string, pass: string) => 
{
  cy.request({
    method: 'POST',
    // Change this to use the exact relative backend path of the demo application
    url: `${API_URL}/api/users/login`, 
    failOnStatusCode: false,
    body: 
    {
      user: 
      {
        email: email,password: pass
      }
    }
  }).then((response) => 
    {
      // Keep your status verification block exactly the same...
      if (response.status !== 200) 
      {
        cy.log('⚠️ API Authentication Failed! Response body:', JSON.stringify(response.body));
        throw new Error(`Login failed with status code ${response.status}. Verify your credentials.`);
      }
      const { token} = response.body.user;
      window.localStorage.setItem('jwtToken', token);
  });
});

