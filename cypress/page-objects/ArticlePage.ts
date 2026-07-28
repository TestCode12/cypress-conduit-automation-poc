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

  editArticle(newTitle: string, newBody: string): void 
  {
    cy.get('a').contains('Edit Article').click();
    cy.get(this.titleInput).clear().type(newTitle);
    cy.get(this.bodyTextArea).clear().type(newBody);
    cy.get(this.publishBtn).contains('Publish Article').click();
 }

  deleteArticle(): void {
    cy.get('button').contains('Delete Article').click();
}
}
