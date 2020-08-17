describe('Wish List page', () => {

  beforeEach(() => {
    cy.visit('/');
  });


  it('should show top panel a logo', () => {
    cy.get('[data-cy=top-panel]').should('have.length', 1);
  });

});