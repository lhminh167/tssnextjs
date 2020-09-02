describe('Department and Category List page', () => {

  beforeEach(() => {
    cy.visit('/department');
  });


  it('should show top panel a logo', () => {
    cy.get('[data-cy=top-panel]').should('have.length', 1);
  });

});