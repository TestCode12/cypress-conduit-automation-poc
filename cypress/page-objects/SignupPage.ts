//SignUp Page form validation

export class SignupPage 
{
  private usernameField = 'input[type="username"], input[placeholder="Username"]';
  private emailField = 'input[type="email"], input[placeholder="Email"]';
  private passwordField = 'input[type="password"], input[placeholder="Password"]';
  private submitBtn = 'button[type="submit"]';

  navigate() 
  {
    cy.visit('/register');
  }

  submitSignup(username: string, email: string, pass: string): void 
  {
    cy.get(this.usernameField).clear().type(username);
    cy.get(this.emailField).clear().type(email);
    cy.get(this.passwordField).clear().type(pass);
    cy.get(this.submitBtn).click();
  }

    verifySignupSuccess(expectedText: string): void
    {
        cy.get(`a[href="/profile/${expectedText}"]`).should('be.visible')
        .and('contain.text', expectedText);
    }

}