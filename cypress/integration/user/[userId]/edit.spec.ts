import { apiCustomerUrl, customerUrl, Role } from "../../../../modules/customer/customer.model";
import { createCustomer, getCustomer } from "../../../../modules/customer/customer.service";
import { getUrl } from "../../../../modules/shared/crud/crud.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { ADDRESS_1, ADDRESS_2, CITY, COUNTRY, DAY_PHONE, DESCRIPTION, EDIT, EMAIL, EVE_PHONE, MOB_PHONE, NAME, POSTALCODE, REGION, ROLE, SHIPPING_REGION, SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { chooseRole } from "../../../helpers/customer/customer.model";
import UserDetailTest, { userDetailTexts } from "../../../helpers/customer/detail/customer-detail.component.spec";
import { testUserEditForm, typeUserEditForm } from "../../../helpers/customer/edit/edit-customer.component.spec";
import { cyGetExistingCustomer, cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomCustomer } from "../../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../../helpers/shared/helpers/other.helper";
import { chooseShippingRegion } from "../../../helpers/shared/models/shipping-region.model";

cyIt.run('Edit User Page -> Edit User Form -> When logged in as customer, then user can edit their own account details #priority-1-working #e2e-working #visual-working', () => {
    const user = mockRandomCustomer();
    const changes = mockRandomCustomer();
    cy
        .wrap(user).pipe(createCustomer).its('content').as('createResponse')
        .its('loginToken').chain(setLoginToken)

        .get('@createResponse').its('customer.customerId').as('customerId')
        .chain(apiCustomerUrl.detail).chain(getUrl)
        .then((url: any) => cy.server().route({ url })).as('route')

        .get('@customerId').chain(customerUrl.edit).its('as').as('editRoute')
        .chain(cy.visit).wait('@route')
    cy
        .clearTextFields(userDetailTexts).takeScreenShot('Edit User Page')
        .wrap(changes).chain(typeUserEditForm)
    cy
        .getEl(ROLE).should('have.class', 'Mui-disabled').should('have.text', user.role)
    cy
        .getEl(SUBMIT).click()
        .get('@customerId').chain(customerUrl.detail).its('as')
        .load().wait('@route')
        .get('@customerId').chain(getCustomer).its('content').as('customer')
        .chain(UserDetailTest)
    cy
        .getEl(EDIT).click()
        .get('@customer').chain(testUserEditForm)
});


cyIt.run('Edit User Page -> Email Adready Taken -> When an email address was used by a user to register, then another user cannot use this email address to register #priority-2-working #e2e-working', () => {
    const user = mockRandomCustomer();
    const changes = mockRandomCustomer();
    cy
        .wrap(user).pipe(createCustomer).its('content').as('createResponse')
        .its('loginToken').chain(setLoginToken)

        .get('@createResponse').its('customer.customerId').as('customerId')
        .chain(apiCustomerUrl.detail).chain(getUrl)
        .then((url: any) => cy.server().route({ url })).as('route')

        .get('@customerId').chain(customerUrl.edit).its('as').as('editRoute')
        .chain(cy.visit).wait('@route')
    cy
        .wrap({ ...changes, email: cyGetExistingCustomer().email }).chain(typeUserEditForm)
    cy
        .getEl(SUBMIT).click()
    cy
        .getEl(DESCRIPTION)
        .should('have.text', 'This email address is already taken. Please use another email address.')
});


cyIt.run('Edit User Page -> Grant Admin Role -> When logged in as admin, then user can grant any customer admin role #priority-2-working #e2e-working', () => {
    cy
        .pipe(mockRandomCustomer).pipe(createCustomer)
        .its('content.customer.customerId').as('customerId')

        .chain(apiCustomerUrl.detail).chain(getUrl)
        .then((url: any) => cy.server().route({ url })).as('route')

        .pipe(cySetAdminLoginToken)

        .get('@customerId').chain(customerUrl.edit).its('as')
        .pipe(cy.visit).wait('@route')

        .pipe(mockRandomCustomer).chain(typeUserEditForm)
        .wrap(Role.Admin).chain(chooseRole);
    cy
        .getEl(SUBMIT).click()
        .get('@customerId').chain(customerUrl.detail).its('as')
        .load().wait('@route')
    cy
        .getEl(ROLE).should('have.text', Role.Admin)
});

cyIt.run('Edit User Page -> Access Denied -> When not-logged-in user accesses Edit User Page, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
    const user = cyGetExistingCustomer();
    const customerId = toNumber(user.customerId);

    const url = customerUrl.edit(customerId).as;
    cy.visit(url).wrap(customerUrl.login(url)).load();
});

cyIt.run('Edit User Page -> Access Denied -> When a customer accesses Edit User Page of another customer, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
    cy
        .pipe(mockRandomCustomer).pipe(createCustomer)
        .its('content.customer.customerId').as('customerId')
        .pipe(cySetCustomerLoginToken)
        .get('@customerId').chain(customerUrl.edit).its('as')
        .pipe(cy.visit).wrap('/').load();

});

cyIt.run('Edit User Page -> Access Denied -> When user logged in as admin, then user could access Edit User Page of any user #priority-4-working #e2e-working', () => {
    const user = cyGetExistingCustomer();
    const customerId = toNumber(user.customerId);

    const url = customerUrl.edit(customerId).as;
    cy.pipe(cySetAdminLoginToken).visit(url).wrap(url).load();
});
