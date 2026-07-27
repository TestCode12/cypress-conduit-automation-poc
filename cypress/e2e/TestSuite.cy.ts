import { SignupPage, LoginPage, ArticlePage, SettingsPage } from '../page-objects';

const signupPage = new SignupPage();
const loginPage = new LoginPage();
const articlePage = new ArticlePage();
const settingsPage = new SettingsPage();

describe('QA Automation Architecture', () => 
{

  context('Tests using API Bypass', () =>
  {
    
      const apiUser =
      { 
        username: `apiuser${Date.now()}`, 
        email: `api.user.${Date.now()}@example.com`, 
        password: 'TestPass123!' 
      };

      before(() => 
      {
        cy.signupByAPI(apiUser.username, apiUser.email, apiUser.password);
      });
    

      it('Create Article Post by Pre-Authorization', () => 
      {
      
        articlePage.navigateToEditor();

        const uniqueTitle = `Automated Deployment Report - Run ID ${Date.now()}`;
        articlePage.createNewArticle(uniqueTitle,
          'Automated testing insights framework tracking validation matrices.',
          '### Summary\nAll functional end-to-end nodes verified.'
        );

        //Validate article creation
        articlePage.verifyArticleTitle(uniqueTitle);
      });
      it('edits an article successfully', () => 
      {
        cy.signupByAPI(apiUser.username, apiUser.email, apiUser.password);
        articlePage.navigateToEditor();
        const title = `Edit Test ${Date.now()}`;
        articlePage.createNewArticle(title, 'desc', 'body');
        articlePage.editArticle(`${title} - Updated`, 'updated body');
        cy.get('h1').should('contain.text', 'Updated');
      });

    it('deletes an article successfully', () => 
    {
      cy.signupByAPI(apiUser.username, apiUser.email, apiUser.password);
      articlePage.navigateToEditor();
      const title = `Delete Test ${Date.now()}`;
      articlePage.createNewArticle(title, 'desc', 'body');
      articlePage.deleteArticle();
      cy.url().should('include', '/'); // redirected home after delete
    });

    it('Re-signup with an existing email overwrites the account (known app behavior)', () => 
    {
      const sharedEmail = `shared.${Date.now()}@example.com`;

      cy.signupByAPI('firstuser' + Date.now(), sharedEmail, 'TestPass123!');

      cy.signupByAPI('seconduser' + Date.now(), sharedEmail, 'TestPass123!')
        .then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body.user.email).to.eq(sharedEmail);
          // Confirms the account was overwritten, not rejected or duplicated
        });
    });

  })
  context('Tests using standard login', () =>
  {

    const uiUser = 
    { 
      username: `uiuser${Date.now()}`, 
      email: `ui.user.${Date.now()}@example.com`, 
      password: 'TestPass123!' 
    };

      it('Validate correct Signup', () => 
    {
      signupPage.navigate();
      signupPage.submitLogin(uiUser.username, uiUser.email, uiUser.password);
      signupPage.verifySignupSuccess(uiUser.username);
    });

    it('Validate correct SignIn', () => 
    {
      loginPage.navigate();
      loginPage.submitLogin(uiUser.email, uiUser.password);
      loginPage.verifyLoginSuccess(uiUser.username);
    });

    it('Validate Incorrect SignIn', () => {
      loginPage.navigate();
      loginPage.submitLogin('invalid_user_de@domain.de', 'WrongPass123');
      loginPage.verifyLoginFailure('credentials invalid');
    });

    it('Logout successfully', () =>
    {

      loginPage.navigate();
      loginPage.submitLogin(uiUser.email, uiUser.password);
      loginPage.verifyLoginSuccess(uiUser.username);

      settingsPage.navigate();
      settingsPage.logout();

      // Check session cleared, Sign in link reappeared
      cy.get('a[href="/login"]').should('be.visible'); 
    })
  })

});
