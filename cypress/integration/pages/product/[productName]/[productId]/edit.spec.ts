describe('Edit Product page', () => {

  beforeEach(() => {
    cy.visit('/product/');
  });


  it('should show top panel a logo', () => {
    cy.get('[data-cy=top-panel]').should('have.length', 1);
  });

});