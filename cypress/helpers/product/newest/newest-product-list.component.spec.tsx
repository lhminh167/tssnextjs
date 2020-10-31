import { PRODUCT_CARD } from "../../../../modules/shared/tag/tag.model";

export default function NewestTest() {
    cy.getEl(PRODUCT_CARD).should($els => {
        const data = $els.toArray().map(el => el.getAttribute('data-id'));
        const sortedData = Cypress._.orderBy(data, e => e, ['desc']);
        expect(data).to.deep.eq(sortedData);
    })
    return cy;
}

