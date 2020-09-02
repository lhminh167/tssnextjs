import { CANONICAL, DESCRIPTION_META_TAG, OG_DESCRIPTION, OG_IMAGE, OG_SITE_NAME, OG_TITLE, OG_TYPE, OG_URL, ROBOTS, TITLE_META_TAG, TWITTER_CARD, TWITTER_DESCRIPTION, TWITTER_DOMAIN, TWITTER_IMAGE, TWITTER_SITE } from "../../../../modules/shared/tag/tag.model";

export function MetadataComponentTest() {
    describe('MetadataComponentTest', () => {

        it('Meta tags should exist', () => {

            cy.getEl(TITLE_META_TAG).should('have.length', 1);
            cy.getEl(DESCRIPTION_META_TAG).should('have.length', 1);

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
