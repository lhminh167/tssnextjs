import ProductHorizontalGalleryComponentTest from "../../shared/product-horizontal-gallery/product-horizontal-gallery.component.spec";
import { PRODUCT_CARD, PRODUCT_LINK } from "../../../../modules/shared/tag/tag.model";

export default function MostDiscountedProductGalleryComponentTest() {
    describe('MostDiscountedProductGalleryComponentTest', () => {

        MostDiscountedProductCardComponentTest();
    })

}


function MostDiscountedProductCardComponentTest() {
    describe('MostDiscountedProductCardComponentTest', () => {

        it('should go product detail page when clicked', () => {
            cy.getEl(PRODUCT_CARD).first().click();
            cy.getEl(PRODUCT_LINK).first().getLink().load();
        });

    })
}
