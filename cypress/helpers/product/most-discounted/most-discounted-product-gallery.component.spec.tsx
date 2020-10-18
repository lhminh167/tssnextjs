import { PERCENTAGE, PRICE } from "../../../../modules/shared/tag/tag.model";

export default function MostDiscountedTest() {
    cy.getEl(PERCENTAGE).should($els => {
        const data = $els.toArray().map(el => el.innerText);
        const sortedData = Cypress._.orderBy(data, e => e, ['desc']);
        expect(data).to.deep.eq(sortedData);
    })
    return cy;
}

