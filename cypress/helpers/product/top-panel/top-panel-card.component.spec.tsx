import { TOP_PANEL_PRODUCT_LINK } from "../../../../modules/shared/tag/tag.model";



export default function ProductGridComponentTest() {
    describe('ProductGridComponentTest', () => {

        it('should go product detail page when clicked', () => {
            cy.getEl(TOP_PANEL_PRODUCT_LINK).first().click().getLink().load();
        })
    })
}