import { customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer } from "../../../modules/customer/customer.service";
import { apiOrderUrl, orderUrl } from "../../../modules/order/order.model";
import { setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { cyCreateOrder } from "../../helpers/order/create/create-order.component.spec";
import { OrderListItemDetailHiddenTest, OrderListItemDetailTest } from "../../helpers/order/list/order-list.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomAccount } from "../../helpers/shared/helpers/auth.helper";

it('Order List Page -> Customer -> When customer accesses Order List Page, customer can see their own orders and cannot see order of other customers #working', () => {

    cy
        .server().route({ url: apiOrderUrl.baseUrl }).as('route')

        .pipe(mockRandomAccount)
        .pipe(createCustomer)
        .its('content.loginToken')
        .chain(setLoginToken)
        .chain(cyCreateOrder).as('yourOrder')

        .pipe(cySetCustomerLoginToken)
        .chain(cyCreateOrder).as('myOrder')
        .wrap(orderUrl.baseUrl).chain(cy.visit).wait('@route')

        .get('@yourOrder').chain(OrderListItemDetailHiddenTest)
        .get('@myOrder').chain(OrderListItemDetailTest)

});

it('Order List Page -> Admin -> When admin accesses Order List Page, admin can see orders created by any customers #working', () => {

    cy
        .server().route({ url: apiOrderUrl.baseUrl }).as('route')

        .pipe(mockRandomAccount)
        .pipe(createCustomer)
        .its('content.loginToken')
        .chain(setLoginToken)
        .chain(cyCreateOrder).as('yourOrder')

        .pipe(cySetCustomerLoginToken)
        .chain(cyCreateOrder).as('myOrder')

        .pipe(cySetAdminLoginToken)
        .wrap(orderUrl.baseUrl).chain(cy.visit).wait('@route')

        .get('@yourOrder').chain(OrderListItemDetailTest)
        .get('@myOrder').chain(OrderListItemDetailTest)
});


it('Order List Page -> Access Denied -> When use is not logged in and access Order List Page, then user is redirected to Login Page #working', () => {

    cy.visit(orderUrl.baseUrl);
    cy.load(customerUrl.login(orderUrl.baseUrl));
});
