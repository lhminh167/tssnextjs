import { customerUrl } from "../../../../modules/customer/customer.model";
import { createCustomer } from "../../../../modules/customer/customer.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { CONFIRM_NEW_PASSWORD, LOGIN, LOGOUT, NEW_PASSWORD, PASSWORD, SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { typeLogin } from "../../../helpers/customer/login/login.component.spec";
import { cyGetExistingCustomer, cySetCustomerLoginToken, mockRandomAccount } from "../../../helpers/shared/helpers/auth.helper";
import { getRandomString } from "../../../helpers/shared/helpers/string.helper";

it('Change Password Page -> Change Password -> When user is logged in, then user could change password of their own account #working', () => {
    const newPassword = getRandomString(5);
    const user = {
        ...mockRandomAccount(),
        newPassword,
        confirmNewPassword: newPassword
    };
    const fields = [PASSWORD, NEW_PASSWORD, CONFIRM_NEW_PASSWORD];
    cy
        .wrap(user).chain(createCustomer).as('loginResponse')
        .its('content.loginToken').chain(setLoginToken)
        .get('@loginResponse').its('content.customer.customerId')
        .pipe(customerUrl.updatePassword).pipe(cy.visit)
        .fillTextFields(fields, user);
    cy.getEl(SUBMIT).click().wrap('/').load();
    cy.getEl(LOGOUT).click().wrap('/').load();
    cy.getEl(LOGIN).click().getLink().load()
        .wrap({ ...user, password: newPassword }).pipe(typeLogin);
    cy.getEl(SUBMIT).click().wrap('/').load();
});

it('Change Password Page -> Access Denied -> When logged-in user accesses Change Password Page of another user, then user is redirected to Home Page', () => {
    cy
        .pipe(cySetCustomerLoginToken)
        .pipe(mockRandomAccount).pipe(createCustomer).its('content.customer')
        .pipe(customerUrl.updatePassword).its('as')
        .pipe(cy.visit).wrap('/').load();


});