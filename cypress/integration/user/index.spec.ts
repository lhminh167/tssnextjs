import { customerUrl } from "../../../modules/customer/customer.model";
import { DETAIL, EDIT, NEW_PASSWORD } from "../../../modules/shared/tag/tag.model";
import { cySetCustomerLoginToken } from "../../helpers/shared/helpers/auth.helper";

it('User Area Page -> View Customer Link -> When a user clicks View Customer Link, then user is redirect to Customer Detail Page', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.getEl(DETAIL).click().getLink().load();
});


it('User Area Page -> Edit Customer Link -> When a user clicks Edit Customer Link, then user is redirect to Edit Customer Page', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.getEl(EDIT).click().getLink().load();
});

it('User Area Page -> Change Password Link -> When a user clicks Change Password Link, then user is redirect to Change Password page', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.getEl(NEW_PASSWORD).click().getLink().load();
});