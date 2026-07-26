// cypress/page-objects/LoginPage.ts
export class LoginPage {
  private emailInput = 'input[placeholder="Email"]';
  private passwordInput = 'input[placeholder="Password"]';
  private signInButton = 'button[type="submit"]';

  navigate() {
    cy.visit('/login');
  }

  submitLogin(email: string, pass: string) {
    cy.get(this.emailInput).type(email);
    cy.get(this.passwordInput).type(pass);
    cy.get(this.signInButton).click();
  }
}
