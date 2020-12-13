import { customerUrl } from "../../../modules/customer/customer.model";
import { getCustomerIdNumberFromLoginToken, getCustomerIdNumberFromStore } from "../../../modules/shared/helpers/auth.helper";
import { DETAIL, EDIT, NEW_PASSWORD } from "../../../modules/shared/tag/tag.model";
import { cySetCustomerLoginToken } from "../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../helpers/shared/helpers/other.helper";

cyIt.run('User Area Page -> View Customer Link -> When a user clicks View Customer Link, then user is redirected to Customer Detail Page #priority-1-working #e2e-working #visual-working', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.pipe(getCustomerIdNumberFromLoginToken).should('be.greaterThan', 0)
    cy.getEl(DETAIL).takeScreenShot('User Area Page')
    cy.getEl(DETAIL).click().getLink().load();
});


cyIt.run('User Area Page -> Edit Customer Link -> When a user clicks Edit Customer Link, then user is redirected to Edit Customer Page #priority-3-working #e2e-working', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.getEl(EDIT).click().getLink().load();
});

cyIt.run('User Area Page -> Change Password Link -> When a user clicks Change Password Link, then user is redirected to Change Password page #priority-3-working #e2e-working', () => {
    cy.pipe(cySetCustomerLoginToken).visit(customerUrl.baseUrl);
    cy.getEl(NEW_PASSWORD).click().getLink().load();
});
