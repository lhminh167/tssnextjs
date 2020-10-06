import { apiCustomerUrl, customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer } from "../../../modules/customer/customer.service";
import { HttpMethod } from "../../../modules/shared/crud/crud.model";
import { EMAIL, SUBMIT } from "../../../modules/shared/tag/tag.model";
import { mockRandomAccount } from "../../helpers/shared/helpers/auth.helper";

it('Forgot Password Page -> Forgot Password -> When not-logged-in user accesses Forgot Password Page, then user can submit a Forgot Password request', () => {
    cy
        .server().route({ url: apiCustomerUrl.forgotPassword, method: HttpMethod.PUT }).as('route')
        .pipe(mockRandomAccount)
        .pipe(createCustomer).its('content.customer').as('user')
        .visit(customerUrl.forgotPassword)
    cy
        .get('@user').then(user => cy.fillTextFields([EMAIL], user));
    cy
        .getEl(SUBMIT).click().wait('@route').its('responseBody').testApi({ status: 200 });
});
