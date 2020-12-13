import { customerUrl } from "../../../../modules/customer/customer.model";
import { createCustomer } from "../../../../modules/customer/customer.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { CONFIRM_NEW_PASSWORD, DESCRIPTION, LOGIN, LOGOUT, NEW_PASSWORD, PASSWORD, SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { changePasswordFields, typeChangePasswordForm } from "../../../helpers/customer/change-password/change-password.component.spec";
import { typeLogin } from "../../../helpers/customer/login/login.component.spec";
import { cyGetExistingCustomer, cySetCustomerLoginToken, mockRandomCustomer } from "../../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../../helpers/shared/helpers/other.helper";
import { getRandomString } from "../../../helpers/shared/helpers/string.helper";

cyIt.run('Change Password Page -> Change Password -> When user is logged in, then user could change password of their own account #priority-1-working #e2e-working #visual-working', () => {
    const user = mockRandomCustomer();
    cy
        .wrap(user).chain(createCustomer).as('loginResponse')
        .its('content.loginToken').chain(setLoginToken)
        .get('@loginResponse').its('content.customer.customerId')
        .pipe(customerUrl.updatePassword).pipe(cy.visit)
    cy.clearTextFields(changePasswordFields).takeScreenShot('Change Password Page')
        .wrap(user).pipe(typeChangePasswordForm);
    cy.getEl(SUBMIT).click()
    cy.getEl(DESCRIPTION).should('have.text', 'Password was updated successfully.');
    cy.getEl(LOGOUT).click().wrap('/').load();
    cy.getEl(LOGIN).click().getLink().load()
        .wrap({ ...user, password: user.newPassword }).pipe(typeLogin);
    cy.getEl(SUBMIT).click().wrap('/').load();
});

cyIt.run('Change Password Page -> Access Denied -> When logged-in user accesses Change Password Page of another user, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
    cy
        .pipe(mockRandomCustomer).pipe(createCustomer)
        .its('content.customer.customerId')
        .pipe(customerUrl.updatePassword).as('url')
        .pipe(cySetCustomerLoginToken)
        .get('@url').chain(cy.visit).wrap('/').load();
});

cyIt.run('Change Password Page -> Access Denied -> When not-logged-in user accesses Change Password Page, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
    cy
        .pipe(mockRandomCustomer).pipe(createCustomer)
        .its('content.customer.customerId')
        .pipe(customerUrl.updatePassword).as('url')
        .chain(cy.visit)
        .get('@url').chain(customerUrl.login).load();
});