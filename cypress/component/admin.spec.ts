describe('Admin Area page', () => {

  beforeEach(() => {
    cy.visit('/admin');
  });


  it('should show top panel a logo', () => {
    cy.get('[data-cy=top-panel]').should('have.length', 1);
  });

});