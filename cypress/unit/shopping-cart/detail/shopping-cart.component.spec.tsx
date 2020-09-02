import { SUBMIT, FILTERED_ITEM_COUNT } from "../../../../modules/shared/tag/tag.model";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";

export default function ShoppingCartComponentTest() {
    describe('ShoppingCartComponentTest', () => {
        CheckoutButtonComponentTest();
    });
}

function CheckoutButtonComponentTest() {
    describe('CheckoutButtonComponentTest', () => {
        let itemCount: number = 0;

        it('should not go to checkout page if there is no items in cart', () => {
            cy.getEl(FILTERED_ITEM_COUNT).its('text').should('not.eq', '0');
            cy.getEl(SUBMIT).click().getLink().load();
        });
    });
}
