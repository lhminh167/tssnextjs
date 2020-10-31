import { customerUrl } from "../../../../modules/customer/customer.model";
import { createCustomer } from "../../../../modules/customer/customer.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { CONFIRM_NEW_PASSWORD, DESCRIPTION, LOGIN, LOGOUT, NEW_PASSWORD, PASSWORD, SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { typeLogin } from "../../../helpers/customer/login/login.component.spec";
import { cyGetExistingCustomer, cySetCustomerLoginToken, mockRandomCustomer } from "../../../helpers/shared/helpers/auth.helper";
import { getRandomString } from "../../../helpers/shared/helpers/string.helper";

it('Change Password Page -> Change Password -> When user is logged in, then user could change password of their own account #e2e-working #visual-working', () => {
    const user = mockRandomCustomer();
    const fields = [PASSWORD, NEW_PASSWORD, CONFIRM_NEW_PASSWORD];
    cy
        .wrap(user).chain(createCustomer).as('loginResponse')
        .its('content.loginToken').chain(setLoginToken)
        .get('@loginResponse').its('content.customer.customerId')
        .pipe(customerUrl.updatePassword).pipe(cy.visit)
    cy.clearTextFields(fields).takeScreenShot('Change Password Page')
    cy.fillTextFields(fields, user);
    cy.getEl(SUBMIT).click()
    cy.getEl(DESCRIPTION).should('have.text', 'Password was updated successfully.');
    cy.getEl(LOGOUT).click().wrap('/').load();
    cy.getEl(LOGIN).click().getLink().load()
        .wrap({ ...user, password: user.newPassword }).pipe(typeLogin);
    cy.getEl(SUBMIT).click().wrap('/').load();
});

it('Change Password Page -> Access Denied -> When logged-in user accesses Change Password Page of another user, then user is redirected to Home Page #e2e-working', () => {
    cy
        .pipe(mockRandomCustomer).pipe(createCustomer)
        .its('content.customer.customerId')
        .pipe(customerUrl.updatePassword).as('url')
        .pipe(cySetCustomerLoginToken)
        .get('@url').chain(cy.visit).wrap('/').load();
});

it('Change Password Page -> Access Denied -> When not-logged-in user accesses Change Password Page, then user is redirected to Home Page #e2e-working', () => {
    cy
        .pipe(mockRandomCustomer).pipe(createCustomer)
        .its('content.customer.customerId')
        .pipe(customerUrl.updatePassword).as('url')
        .chain(cy.visit)
        .get('@url').chain(customerUrl.login).load();
});