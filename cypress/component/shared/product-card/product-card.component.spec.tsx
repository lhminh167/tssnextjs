import { PRODUCT_CARD, PRODUCT_LINK } from "../../../../modules/shared/tag/tag.model";

export default function ProductCardComponentTest() {
  describe('ProductCardComponentTest', () => {

    it('should redirect to product detail page when clicked', () => {
      ClickTheFirstProductCardComponent();
    });

    it('should show product image', () => {

    });


  });
}

export function ClickTheFirstProductCardComponent() {
  cy.getEl(PRODUCT_CARD).first().click();
  cy.getEl(PRODUCT_LINK).first().getLink().load();
}