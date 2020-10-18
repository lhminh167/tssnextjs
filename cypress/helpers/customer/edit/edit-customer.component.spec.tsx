import { Customer, Role } from "../../../../modules/customer/customer.model";
import { ROLE, SHIPPING_REGION } from "../../../../modules/shared/tag/tag.model";
import { chooseShippingRegion } from "../../shared/models/shipping-region.model";
import { userDetailTexts } from "../detail/customer-detail.component.spec";

export function typeUserEditForm(changes: Customer) {
    cy.fillTextFields(userDetailTexts, changes);
    cy.wrap(changes.shippingRegionId).chain(chooseShippingRegion);
}

export function testUserEditForm(user: Customer) {
    cy.testTextFields(userDetailTexts, user)
    cy.getEl(SHIPPING_REGION).should('have.text', user.shippingRegion.shippingRegion1)
    cy.getEl(ROLE).should('have.text', user.role)
}

