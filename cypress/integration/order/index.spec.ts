import { customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer } from "../../../modules/customer/customer.service";
import { apiOrderUrl, Order, orderUrl } from "../../../modules/order/order.model";
import { IResponse, PaginatedList } from "../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../modules/shared/crud/crud.service";
import { removeLoginToken, setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { cyCreateOrder } from "../../helpers/order/create/create-order.component.spec";
import { OrderListItemDetailHiddenTest, OrderListItemDetailTest } from "../../helpers/order/list/order-list.component.spec";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { cyAddToCart } from "../../helpers/shopping-cart/detail/shopping-cart.component.spec";

cyIt.run('Order List Page -> Customer\'s Orders -> When customer accesses Order List Page, then customer can see their own orders and cannot see order of other customers #priority-4-working #e2e-working', () => {

    cy
        .server().route({ url: getUrl(apiOrderUrl.baseUrl) + '**' }).as('route')

        .pipe(cySetCustomerLoginToken)
        .then(() => cyAddToCart(cyGetExistingProduct(), 1, true))
        .chain(cyCreateOrder).as('yourOrder')

        .chain(removeLoginToken)
        .pipe(mockRandomCustomer)
        .pipe(createCustomer)
        .its('content.loginToken')
        .chain(setLoginToken)
        .then(() => cyAddToCart(cyGetExistingProduct(), 1, true))
        .chain(cyCreateOrder).as('myOrder')
        .wrap(orderUrl.baseUrl).chain(cy.visit).wait('@route')

        .get('@yourOrder').chain(OrderListItemDetailHiddenTest)
        .get('@myOrder').chain(OrderListItemDetailTest)
});

cyIt.run('Order List Page -> Admin -> When admin accesses Order List Page, then admin can see orders created by any customers #priority-2-working #e2e-working', () => {

    cy
        .server().route({ url: getUrl(apiOrderUrl.baseUrl) + '**' }).as('route')

        .pipe(mockRandomCustomer)
        .pipe(createCustomer)
        .its('content.loginToken')
        .chain(setLoginToken)
        .then(() => cyAddToCart(cyGetExistingProduct(), 1, true))
        .chain(cyCreateOrder).as('yourOrder')

        .pipe(cySetCustomerLoginToken)
        .then(() => cyAddToCart(cyGetExistingProduct(), 1, true))
        .chain(cyCreateOrder).as('myOrder')

        .pipe(cySetAdminLoginToken)
        .wrap(orderUrl.baseUrl).chain(cy.visit).wait('@route')

        .get('@yourOrder').chain(OrderListItemDetailTest)
        .get('@myOrder').chain(OrderListItemDetailTest)
});


cyIt.run('Order List Page -> Access Denied -> When user is not logged in and access Order List Page, then user is redirected to Login Page #priority-4-working #e2e-working', () => {

    cy.visit(orderUrl.baseUrl);
    cy.load(customerUrl.login(orderUrl.baseUrl));
});


cyIt.run('Order List Page -> Visual Regression Test -> When user accesses Order List Page, then CSS styles, HTML elements, retrieved should be displayed as expected #priority-1-working #integration-working #visual-working', () => {

    cy
        .server()
        .fixture<IResponse<PaginatedList<Order>>>('orders.json')
        .then(res => ({
            ...res, content: {
                ...res.content,
                items: res.content.items.slice(0, 8),
            }
        }))
        .then(res => cy.route({ url: getUrl(apiOrderUrl.baseUrl + '**'), response: res }))
        .pipe(cySetCustomerLoginToken)
        .visit(orderUrl.baseUrl)
        .takeScreenShot('Order List Page')
});
