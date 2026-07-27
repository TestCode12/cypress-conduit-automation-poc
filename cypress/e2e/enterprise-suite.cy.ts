// cypress/e2e/enterprise-suite.cy.ts
import { LoginPage, ArticlePage } from '../page-objects/ConduitApp';

const loginPage = new LoginPage();
const articlePage = new ArticlePage();

describe('QA Automation Architecture', () => {

  it('Scenario 1 (POM Pattern): Validate Error Interception on Failed UI Login', () => {
    loginPage.navigate();
    loginPage.submitLogin('invalid_user_de@domain.de', 'WrongPass123');
    loginPage.verifyAuthenticationFailure('credentials invalid');
  });

  it('Scenario 2 (App Action/API Bypass Pattern): Create Article Post via Instant Pre-Auth', () => {
    // 1. Programmatically authenticate via API to bypass UI screens entirely
    // Replace with a valid test account on Conduit or sign up manually on the web UI first
    cy.loginByAPI('test.user@example.com', 'TestPass123!');

    // 2. Drop the pre-authenticated browser session directly onto the restricted dashboard page
    articlePage.navigateToEditor();

    // 3. Complete feature interaction using localized POM parameters
    const uniqueTitle = `Automated Deployment Report - Run ID ${Date.now()}`;
    articlePage.createNewArticle(
      uniqueTitle,
      'Automated testing insights framework tracking validation matrices.',
      '### Summary\nAll functional end-to-end nodes verified.'
    );

    // 4. Assert the final UI outcome
    articlePage.verifyArticleTitle(uniqueTitle);
  });
});
