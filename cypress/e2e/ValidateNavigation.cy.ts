describe('Validate different navigation paths', () => {
    const signinlink = 'a[href="/login"]';
    const signuplink = 'a[href="/register"]';
    

    it('On click of SignIn link , navigates to Sign In Page ', () => {
        cy.visit('/');
        cy.get(signinlink).click();
        cy.url().should('include', '/login');
    });

    it('On click of SignUp link , navigates to Sign Up page ', () => {
        cy.visit('/');
        cy.get(signuplink).click();
        cy.url().should('include', '/register');
    });

});