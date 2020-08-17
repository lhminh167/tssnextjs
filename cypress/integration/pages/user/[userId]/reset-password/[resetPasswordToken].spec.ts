describe('Reset Password page', () => {

    beforeEach(() => {
        cy.visit('/user/1/reset-password/token');
    });


    it('should show top panel a logo', () => {
        cy.get('[data-cy=top-panel]').should('have.length', 1);
    });

});