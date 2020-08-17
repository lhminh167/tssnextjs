describe('Login page', () => {

    beforeEach(() => {
        cy.visit('/user/login/');
    });


    it('should show top panel a logo', () => {
        cy.get('[data-cy=top-panel]').should('have.length', 1);
    });

});