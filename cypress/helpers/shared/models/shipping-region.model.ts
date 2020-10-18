import { SHIPPING_REGION } from "../../../../modules/shared/tag/tag.model";

export function chooseShippingRegion(shippingRegionId: number) {
    cy.getEl(SHIPPING_REGION).click();
    cy.getEl(SHIPPING_REGION + shippingRegionId).click();
}
