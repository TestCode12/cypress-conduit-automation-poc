// cypress/e2e/auth-flow.cy.ts
import { LoginPage } from '../page-objects/LoginPage';
const loginPage = new LoginPage();

describe('Authentication & Dashboard Validation', () => {

  it('should display an explicit error message with invalid credentials', () => {
    loginPage.navigate();
    loginPage.submitLogin('wronguser@domain.com', 'InvalidPass123');
    
    // Asserting the error handling behavior of the application
    cy.get('.error-messages').should('be.visible')
    .and('contain', 'email or password');
  });
});
