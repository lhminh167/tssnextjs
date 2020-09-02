describe('Forgot Password page', () => {

    beforeEach(() => {
        cy.visit('/user/forgot-password');
    });


    it('should show top panel a logo', () => {
        cy.get('[data-cy=top-panel]').should('have.length', 1);
    });

});