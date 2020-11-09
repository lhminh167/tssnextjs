import { customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer } from "../../../modules/customer/customer.service";
import { apiOrderUrl, orderUrl } from "../../../modules/order/order.model";
import { shipOk, stockNotOk, stockOk } from "../../../modules/order/order.service";
import { getUrl } from "../../../modules/shared/crud/crud.service";
import { removeLoginToken, setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { cyCreateOrder } from "../../helpers/order/create/create-order.component.spec";
import { OrderListItemDetailHiddenTest, OrderListItemDetailTest } from "../../helpers/order/list/order-list.component.spec";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { cyAddToCart } from "../../helpers/shopping-cart/detail/shopping-cart.component.spec";

cyIt.run('Order List Page -> Customer\'s Orders -> When customer accesses Order List Page, customer can see their own orders and cannot see order of other customers #e2e-working #visual-working', () => {

    cy
        .server().route({ url: getUrl(apiOrderUrl.baseUrl) + '**' }).as('route')

        .pipe(cySetCustomerLoginToken)
        .wrap(cyAddToCart(cyGetExistingProduct(), 1, true))
        .chain(cyCreateOrder).as('yourOrder')

        .chain(removeLoginToken)
        .pipe(mockRandomCustomer)
        .pipe(createCustomer)
        .its('content.loginToken')
        .chain(setLoginToken)
        .wrap(cyAddToCart(cyGetExistingProduct(), 1, true))
        .chain(cyCreateOrder).as('myOrder')
        .wrap(orderUrl.baseUrl).chain(cy.visit).wait('@route')

        .get('@yourOrder').chain(OrderListItemDetailHiddenTest)
        .get('@myOrder').chain(OrderListItemDetailTest)
        .takeScreenShot('Order List Page')

});

cyIt.run('Order List Page -> Admin -> When admin accesses Order List Page, admin can see orders created by any customers #e2e-working', () => {

    cy
        .server().route({ url: getUrl(apiOrderUrl.baseUrl) + '**' }).as('route')

        .pipe(mockRandomCustomer)
        .pipe(createCustomer)
        .its('content.loginToken')
        .chain(setLoginToken)
        .wrap(cyAddToCart(cyGetExistingProduct(), 1, true))
        .chain(cyCreateOrder).as('yourOrder')

        .pipe(cySetCustomerLoginToken)
        .wrap(cyAddToCart(cyGetExistingProduct(), 1, true))
        .chain(cyCreateOrder).as('myOrder')

        .pipe(cySetAdminLoginToken)
        .wrap(orderUrl.baseUrl).chain(cy.visit).wait('@route')

        .get('@yourOrder').chain(OrderListItemDetailTest)
        .get('@myOrder').chain(OrderListItemDetailTest)
});


cyIt.run('Order List Page -> Access Denied -> When user is not logged in and access Order List Page, then user is redirected to Login Page #e2e-working', () => {

    cy.visit(orderUrl.baseUrl);
    cy.load(customerUrl.login(orderUrl.baseUrl));
});
