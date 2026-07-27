describe('Validate different navigation paths', () => {
    const signinlink = 'a[href="/login"]';
    const signuplink = 'a[href="/register"]';

    it('Navigates to Sign In Page on click of SignIn link', () => {
        cy.visit('/');
        cy.get(signinlink).click();
        cy.url().should('include', '/login');
    });

    it('Navigates to Sign Up page on click of SignUp link', () => {
        cy.visit('/');
        cy.get(signuplink).click();
        cy.url().should('include', '/register');
    });
});