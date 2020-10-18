import { customerUrl } from "../../../modules/customer/customer.model";
import { getCustomerIdNumberFromLoginToken, getCustomerIdNumberFromStore } from "../../../modules/shared/helpers/auth.helper";
import { DETAIL, EDIT, NEW_PASSWORD } from "../../../modules/shared/tag/tag.model";
import { cySetCustomerLoginToken } from "../../helpers/shared/helpers/auth.helper";

it('User Area Page -> View Customer Link -> When a user clicks View Customer Link, then user is redirect to Customer Detail Page #working', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.pipe(getCustomerIdNumberFromLoginToken).should('be.greaterThan', 0)
    cy.getEl(DETAIL).click().getLink().load();
});


it('User Area Page -> Edit Customer Link -> When a user clicks Edit Customer Link, then user is redirect to Edit Customer Page #working', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.getEl(EDIT).click().getLink().load();
});

it('User Area Page -> Change Password Link -> When a user clicks Change Password Link, then user is redirect to Change Password page #working', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.getEl(NEW_PASSWORD).click().getLink().load();
});