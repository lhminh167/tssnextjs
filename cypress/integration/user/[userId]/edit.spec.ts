import { apiCustomerUrl, customerUrl } from "../../../../modules/customer/customer.model";
import { getUrl } from "../../../../modules/shared/crud/crud.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { CITY, COUNTRY, DAY_PHONE, EMAIL, EVE_PHONE, MOB_PHONE, NAME, REGION, ROLE, SHIPPING_REGION, SUBMIT, YES } from "../../../../modules/shared/tag/tag.model";
import { createCustomer } from "../../../helpers/customer/customer.service";
import { cyGetExistingCustomer, cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomAccount } from "../../../helpers/shared/helpers/auth.helper";

it('Edit User Page -> Edit User Form -> When logged in as customer, then user can edit their own account details', () => {
    const user = cyGetExistingCustomer();
    const fields = [NAME, EMAIL, COUNTRY, REGION, MOB_PHONE, EVE_PHONE, DAY_PHONE, ROLE, CITY];
    cy
        .server().route({ url: getUrl(apiCustomerUrl.detail(toNumber(user.customerId))) }).as('route')
        .pipe(cySetCustomerLoginToken)
        .visit(customerUrl.edit(toNumber(user.customerId)).as).wait('@route')
        .fillTextFields(fields, user).then(() => {
            if (user.shippingRegion.shippingRegion1)
                cy
                    .getEl(SHIPPING_REGION)
                    .clear()
                    .type(user.shippingRegion.shippingRegion1)
                    .should('have.text', user.shippingRegion.shippingRegion1);
        })
    cy.getEl(SUBMIT).click().wrap(customerUrl.detail(toNumber(user.customerId)).as).load();
});

it('Edit User Page -> User Details -> When logged in as customer, then details shown on Edit User Form should have correct values', () => {
    const user = cyGetExistingCustomer();
    const fields = [NAME, EMAIL, COUNTRY, REGION, MOB_PHONE, EVE_PHONE, DAY_PHONE, ROLE, CITY];
    cy
        .server().route({ url: getUrl(apiCustomerUrl.detail(toNumber(user.customerId))) }).as('route')
        .pipe(cySetCustomerLoginToken)
        .visit(customerUrl.edit(toNumber(user.customerId)).as).wait('@route')
        .testTextFields(fields, user).then(() => {
            if (user.shippingRegion.shippingRegion1)
                cy.getEl(SHIPPING_REGION).should('have.text', user.shippingRegion.shippingRegion1);
        })
});

it('Edit User Page -> Access Denied -> When not-logged-in user accesses Edit User Page, then user is redirected to Home Page', () => {
    const user = cyGetExistingCustomer();
    const url = customerUrl.edit(toNumber(user.customerId)).as;
    cy.visit(url).wrap(customerUrl.login(url)).load();
});

it('Edit User Page -> Access Denied -> When a customer accesses Edit User Page of another customer, then user is redirected to Home Page', () => {
    cy
        .pipe(cySetCustomerLoginToken)
        .pipe(mockRandomAccount).pipe(createCustomer).its('content.customer')
        .pipe(customerUrl.edit).its('as')
        .pipe(cy.visit).wrap('/').load();

});

it('Edit User Page -> Access Denied -> When user logged in as admin, then user could access Edit User Page of any user', () => {
    const user = cyGetExistingCustomer();
    const url = customerUrl.edit(toNumber(user.customerId)).as;
    cy.pipe(cySetAdminLoginToken).visit(url).wrap(url).load();
});
