export function closeMobileNavbar() {
    cy.get('.MuiBackdrop-root').click({ force: true })
}