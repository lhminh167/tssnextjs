import { getProduct } from "../../../../modules/product/detail/product-detail.service";
import { productUrl } from "../../../../modules/product/filter/product-filter.model";
import { backToPreviousPage } from "../../../../modules/shared/helpers/auth.helper";
import { getDiscountedPrice, IProduct } from "../../../../modules/shared/models/product.model";
import { DISCOUNTED_PRICE, NAME, PRODUCT_CARD, PRODUCT_LINK } from "../../../../modules/shared/tag/tag.model";

export default function ProductCardDetailTest(input: IProduct) {
  cy.getEl(PRODUCT_CARD).get(`[data-id=${input.productId}]`).should('exist').within(() => {
    cy.getEl(NAME).should('have.text', input.name);
    cy.getEl(DISCOUNTED_PRICE).should('have.text', getDiscountedPrice(input));
  })
  return cy;

}

export function ProductLinkTest() {
  cy.getEl(PRODUCT_CARD).first().invoke('data-id').pipe(getProduct).its('content').then(product => {
    cy.getEl(PRODUCT_LINK).first().getLink().should('have.value', productUrl.detail(product).as);
  });
  return cy;
}

