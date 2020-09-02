import ProductListComponentTest from "../../shared/product-list/product-list.component.spec";
import { FILTERED_ITEM_COUNT } from "../../../../modules/shared/tag/tag.model";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";

export default function ProductFilterComponentTest() {

    describe('Product Filter Component', () => {

        it('should show some products', () => {
            cy.getEl(FILTERED_ITEM_COUNT).invoke('text').then(parseFloat).should('be.gt', 0);

        });

        ProductListComponentTest();
    });
}
