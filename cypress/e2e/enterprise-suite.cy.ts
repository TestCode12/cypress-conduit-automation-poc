import { LoginPage, ArticlePage } from '../page-objects/ConduitApp';

const loginPage = new LoginPage();
const articlePage = new ArticlePage();

describe('QA Automation Architecture', () => 
{

  const timestamp = Date.now();
  const testEmail = `qa.user.${timestamp}@example.com`;
  const testUsername = `qauser${timestamp}`;
  const testPassword = 'TestPass123!';

  before(() => 
  {
    cy.signupByAPI(testUsername, testEmail, testPassword);
  });

  //Standard POM way to validate login failure
  it('Validate Error on Failed Login', () => {
    loginPage.navigate();
    loginPage.submitLogin('invalid_user_de@domain.de', 'WrongPass123');
    loginPage.verifyAuthenticationFailure('credentials invalid');
  });

  //API Bypass way using APP Action
  it('Create Article Post by Pre-Authorization', () => 
  {
   
    cy.loginByAPI(testEmail, testPassword);

    articlePage.navigateToEditor();

    //Complete feature interaction using localized POM parameters
    const uniqueTitle = `Automated Deployment Report - Run ID ${Date.now()}`;
    articlePage.createNewArticle(uniqueTitle,
      'Automated testing insights framework tracking validation matrices.',
      '### Summary\nAll functional end-to-end nodes verified.'
    );

    //Assert the final UI outcome
    articlePage.verifyArticleTitle(uniqueTitle);
  });
});
