import { TITLE, DESCRIPTION, OG_DESCRIPTION, OG_TITLE, TWITTER_CARD, TWITTER_SITE, TWITTER_DESCRIPTION, TWITTER_DOMAIN, TWITTER_IMAGE, OG_IMAGE, OG_SITE_NAME, OG_TYPE, OG_URL, ROBOTS, CANONICAL } from "../../modules/shared/metadata/metadata.tag";

// Cypress.Commands.add('itShouldLoadMetaTags', (subject) => {
export function itShouldLoadMetaTags() {

    describe('Metadata', () => {

        it('should load meta tags', () => {

            cy.getEl(TITLE).should('have.length', 1);
            cy.getEl(DESCRIPTION).should('have.length', 1);

            cy.getEl(OG_TITLE).should('have.length', 1);
            cy.getEl(OG_DESCRIPTION).should('have.length', 1);
            cy.getEl(OG_IMAGE).should('have.length', 1);
            cy.getEl(OG_SITE_NAME).should('have.length', 1);
            cy.getEl(OG_TYPE).should('have.length', 1);
            cy.getEl(OG_URL).should('have.length', 1);

            cy.getEl(TWITTER_CARD).should('have.length', 1);
            cy.getEl(TWITTER_SITE).should('have.length', 1);
            cy.getEl(TWITTER_DESCRIPTION).should('have.length', 1);
            cy.getEl(TWITTER_DOMAIN).should('have.length', 1);
            cy.getEl(TWITTER_IMAGE).should('have.length', 1);

            cy.getEl(ROBOTS).should('have.length', 1);
            cy.getEl(CANONICAL).should('have.length', 1);

        });

    });
}
// });
