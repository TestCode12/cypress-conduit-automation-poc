export class ArticlePage 
{
  private titleInput = 'input[placeholder="Article Title"]';
  private descriptionInput = 'input[placeholder="What\'s this article about?"]';
  private bodyTextArea = 'textarea[placeholder="Write your article (in markdown)"]';
  private publishBtn = 'button[type="button"], button[type="submit"]';

  navigateToEditor() 
  {
    cy.visit('/editor');
  }

  createNewArticle(title: string, desc: string, body: string): void 
  {
    cy.get(this.titleInput).type(title);
    cy.get(this.descriptionInput).type(desc);
    cy.get(this.bodyTextArea).type(body);
    cy.get(this.publishBtn).contains('Publish Article').click();
  }

  verifyArticleTitle(expectedTitle: string): void 
  {
    cy.get('h1').should('be.visible').and('have.text', expectedTitle);
  }

  //cy.cleanupArticle(slug)
}
