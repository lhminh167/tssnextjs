describe('Checkout page', () => {

  beforeEach(() => {
    cy.visit('/order/new');
  });


  it('should show top panel a logo', () => {
    cy.get('[data-cy=top-panel]').should('have.length', 1);
  });

});