import { SEARCH_BOX } from "../../../../modules/shared/tag/tag.model";


export default function SearchComponentTest() {
    describe('SearchComponentTest', () => {

        it('should show products containing used keyword', () => {
            // cycreateProduct
            cy.getEl(SEARCH_BOX)

        });

    });
}

