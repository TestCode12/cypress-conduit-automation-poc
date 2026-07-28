export class SettingsPage 
{
  private logoutBtn = 'button.btn-outline-danger';

  navigate() 
  {
    cy.visit('/settings');
  }

  logout(): void 
  {
    cy.get(this.logoutBtn).contains('logout').click();
  }
}