import { before } from "mocha"
import { productUrl } from "../../../../modules/product/filter/product-filter.model"
import { randomString } from "../../../support/commands"
import { NAME, PRICE, DISCOUNTED_PRICE, DESCRIPTION, CATEGORY, SIZE, COLOR } from "../../../../modules/shared/tag/tag.model"

export default function CreateProductComponentTest() {
    describe('CreateProductComponentTest', () => {
        // before(() => {
        //     cy.visit(productUrl.new)
        // })

        it('allows admin to add a new product', () => {
            const randomText = randomString(5);
            cy.get(NAME).type(randomText);
            cy.get(DESCRIPTION).type(randomText);
            cy.get(PRICE).type('100.65');
            cy.get(DISCOUNTED_PRICE).type('99.5');

            cy.get(CATEGORY).click();
            cy.get(CATEGORY).click();

            cy.get(COLOR).click(name);
            cy.get(COLOR).click(name);

            cy.get(SIZE).click(name);
            cy.get(SIZE).click(name);


            cy.get(NAME).type(name);

        })
    })
}
