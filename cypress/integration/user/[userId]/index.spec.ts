import { apiCustomerUrl, customerUrl } from "../../../../modules/customer/customer.model";
import { getUrl } from "../../../../modules/shared/crud/crud.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { CITY, COUNTRY, DAY_PHONE, EDIT, EMAIL, EVE_PHONE, MOB_PHONE, NAME, REGION, ROLE, SHIPPING_REGION } from "../../../../modules/shared/tag/tag.model";
import { createCustomer } from "../../../helpers/customer/customer.service";
import CustomerDetailTest from "../../../helpers/customer/detail/customer-detail.component.spec";
import { cyGetExistingCustomer, cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomAccount } from "../../../helpers/shared/helpers/auth.helper";

it('User Detail Page -> User Details -> When user accesses his own User Detail Page, user details should have correct values', () => {
    const user = cyGetExistingCustomer();
    const fields = [NAME, EMAIL, COUNTRY, REGION, MOB_PHONE, EVE_PHONE, DAY_PHONE, ROLE, CITY];
    cy
        .server().route({ url: getUrl(apiCustomerUrl.detail(toNumber(user.customerId))) }).as('route')
        .pipe(cySetCustomerLoginToken)
        .visit(customerUrl.detail(toNumber(user.customerId)).as).wait('@route')
        .wrap(user).chain(CustomerDetailTest);
});

it('User Detail Page -> Access Denied -> When not-logged-in user accesses User Detail Page, then user is redirected to Home Page', () => {
    const user = cyGetExistingCustomer();
    const detailUrl = customerUrl.detail(toNumber(user.customerId)).as;
    cy
        .visit('/').visit(detailUrl)
        .wrap(customerUrl.login(detailUrl)).load();
});

it('User Detail Page -> Access Denied -> When a customer accesses User Detail Page of another customer, then user is redirected to Home Page', () => {
    cy
        .visit('/')
        .pipe(cySetCustomerLoginToken)
        .pipe(mockRandomAccount).pipe(createCustomer).its('content.customer')
        .pipe(customerUrl.detail).its('as')
        .pipe(cy.visit).wrap('/').load();

});


it('User Detail Page -> Edit Button -> When customer clicks Edit button, then customer is redirected to Edit User Page', () => {
    cy
        .pipe(cySetCustomerLoginToken)
        .pipe(customerUrl.detail).its('as').pipe(cy.visit);
    cy
        .getEl(EDIT).click().getLink().load();

});

it('User Detail Page -> Access Denied -> When user logged in as admin, then user could access User Detail Page of any user', () => {
    cy
        .visit('/')
        .pipe(cySetAdminLoginToken)
        .pipe(mockRandomAccount).pipe(createCustomer).its('content.customer')
        .pipe(customerUrl.detail).its('as')
        .pipe(cy.visit).wrap('/').load();

});
