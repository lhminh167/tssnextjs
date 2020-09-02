describe('User List page', () => {

    beforeEach(() => {
        cy.visit('/user/');
    });


    it('should show top panel a logo', () => {
        cy.get('[data-cy=top-panel]').should('have.length', 1);
    });

});