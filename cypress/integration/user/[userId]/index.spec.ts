import { apiCustomerUrl, customerUrl } from "../../../../modules/customer/customer.model";
import { createCustomer } from "../../../../modules/customer/customer.service";
import { getUrl } from "../../../../modules/shared/crud/crud.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { EDIT, NAME } from "../../../../modules/shared/tag/tag.model";
import UserDetailTest from "../../../helpers/customer/detail/customer-detail.component.spec";
import { cyGetExistingCustomer, cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomCustomer } from "../../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../../helpers/shared/helpers/other.helper";

cyIt.run('User Detail Page -> User Details -> When user accesses his own User Detail Page, user details should have correct values #priority-1-working #e2e-working #visual-working', () => {
    const user = cyGetExistingCustomer();
    cy
        .server().route({ url: getUrl(apiCustomerUrl.detail(toNumber(user.customerId))) }).as('route')
        .pipe(cySetCustomerLoginToken)
        .visit(customerUrl.detail(toNumber(user.customerId)).as).wait('@route')
    cy
        .getEl(NAME).should('have.text', user.name).takeScreenShot('User Detail Page')
        .wrap(user).chain(UserDetailTest);
});

cyIt.run('User Detail Page -> Access Denied -> When not-logged-in user accesses User Detail Page, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
    const user = cyGetExistingCustomer();
    const detailUrl = customerUrl.detail(toNumber(user.customerId)).as;
    cy
        .visit('/').visit(detailUrl)
        .wrap(customerUrl.login(detailUrl)).load();
});

cyIt.run('User Detail Page -> Access Denied -> When a customer accesses User Detail Page of another customer, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
    cy
        .visit('/')
        .pipe(mockRandomCustomer).pipe(createCustomer).its('content.customer.customerId')
        .pipe(customerUrl.detail).its('as').as('url')
        .pipe(cySetCustomerLoginToken)
        .get('@url').chain(cy.visit).wrap('/').load();

});


cyIt.run('User Detail Page -> Edit Button -> When customer clicks Edit button, then customer is redirected to Edit User Page #priority-4-working #e2e-working', () => {
    cy
        .pipe(cySetCustomerLoginToken)
        .pipe(cyGetExistingCustomer).its('customerId')
        .chain(customerUrl.detail).its('as')
        .pipe(cy.visit);
    cy
        .getEl(EDIT).click().getLink().load();

});

cyIt.run('User Detail Page -> Access Denied -> When user logged in as admin, then user could access User Detail Page of any user #priority-4-working #e2e-working', () => {
    cy
        .pipe(cySetAdminLoginToken)
        .pipe(cyGetExistingCustomer).its('customerId')
        .chain(customerUrl.detail).its('as').as('url')
        .pipe(cy.visit).get('@url').load();
});
