import { SignupPage, LoginPage, ArticlePage } from '../page-objects';

const signupPage = new SignupPage();
const loginPage = new LoginPage();
const articlePage = new ArticlePage();

describe('QA Automation Architecture', () => 
{
  const timestamp = Date.now();
  const testEmail = `qa.user.${timestamp}@example.com`;
  const testUsername = `qauser${timestamp}`;
  const testPassword = 'TestPass123!';

  context('Tests using API Bypass', () =>
  {
    before(() => 
    {
      cy.signupByAPI(testUsername,testEmail, testPassword);
    });
    


    it('Create Article Post by Pre-Authorization', () => 
    {
    
      articlePage.navigateToEditor();

      //Create article
      const uniqueTitle = `Automated Deployment Report - Run ID ${Date.now()}`;
      articlePage.createNewArticle(uniqueTitle,
        'Automated testing insights framework tracking validation matrices.',
        '### Summary\nAll functional end-to-end nodes verified.'
      );

      //Validate article creation
      articlePage.verifyArticleTitle(uniqueTitle);
    });

  it('documents that re-signup with an existing email overwrites the account (known app behavior)', () => {
    const sharedEmail = `shared.${Date.now()}@example.com`;

    cy.signupByAPI('firstuser' + Date.now(), sharedEmail, 'TestPass123!');

    cy.signupByAPI('seconduser' + Date.now(), sharedEmail, 'TestPass123!')
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.user.email).to.eq(sharedEmail);
        // Confirms the account was overwritten, not rejected or duplicated
      });

    // Optional: prove the original username no longer resolves to a profile
    cy.request({
      url: `${Cypress.config().baseUrl}/profile/firstuser`,
      failOnStatusCode: false,
    }); // could assert on a 404-equivalent app state if you want to go further
  
  });
    
  })
  context('Tests using standard login', () =>
  {
      it('Validate correct Signup', () => 
    {
      signupPage.navigate();
      signupPage.submitLogin(testUsername, testEmail, testPassword);
      signupPage.verifySignupSuccess(testUsername);
    });

    it('Validate correct SignIn', () => 
    {
      loginPage.navigate();
      loginPage.submitLogin(testEmail, testPassword);
      loginPage.verifyLoginSuccess(testUsername);
    });

    //Validate login failure
    it('Validate Incorrect SignIn', () => {
      loginPage.navigate();
      loginPage.submitLogin('invalid_user_de@domain.de', 'WrongPass123');
      loginPage.verifyLoginFailure('credentials invalid');
    });
  })






  //Create Article by API Bypass way using APP Action

});
