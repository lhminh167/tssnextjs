import { from } from "form-data";
import { orderUrl } from "../../../modules/order/order.model";
import { DESCRIPTION, ORDER, STATUS } from "../../../modules/shared/tag/tag.model";
import { cyCreateOrder } from "../../helpers/order/create/create-order.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { CONFIRM_STOCK, SUBMIT, YES, CONFIRM_SHIPPING, NO, CANCEL, COMMENT, ORDER_SUMMARY, tag } from "../../../modules/shared/tag/tag.model";
import { customerUrl } from "../../../modules/customer/customer.model";
import { HiddenConfirmStockComponentTest } from "../../helpers/order/detail/stock-ok.component.spec";
import { HiddenConfirmShippingComponentTest } from "../../helpers/order/detail/ship-ok.component.spec";
import { OrderDetailStatusTest, OrderStatus } from "../../helpers/order/detail/order-detail.component.spec";
import { stockOk } from "../../../modules/order/order.service";
import { setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { createCustomer } from "../../../modules/customer/customer.service";

it('Order Detail Page -> Confirm Stock Not Ok -> When logged in as admin, user could cancel an order because some of its products are out of stock #working', () => {

    const comment = `The following products are out of stock:
- Green XL Birds T-Shirt. Required Quantity: 10. Available Quantity: 09.
- Blue L Wreath T-Shirt. Required Quantity: 05. Available Quantity: 02.
- etc.
`;

    cy
        .pipe(cySetCustomerLoginToken)
        .chain(cyCreateOrder).as('order')
        .pipe(cySetAdminLoginToken)
        .get('@order').its('orderId').chain(orderUrl.detail).its('as')
        .pipe(cy.visit)

    cy.getEl(CONFIRM_STOCK);
    cy.getEl(COMMENT).type(comment);
    cy.getEl(CANCEL).click();
    cy.getEl(YES).click().should('not.exist')
    cy.wrap(OrderStatus.OutOfStock).chain(OrderDetailStatusTest)
    cy.getEl(tag(ORDER_SUMMARY, '', COMMENT)).should('have.text', comment);

});

it('Order Detail Page -> Complete Order -> When logged in as admin, user could confirm stock & shipping of any customer\'s order #working', () => {

    cy
        .pipe(cySetCustomerLoginToken)
        .chain(cyCreateOrder).as('order')
        .pipe(cySetAdminLoginToken)
        .get('@order').its('orderId').chain(orderUrl.detail).its('as')
        .pipe(cy.visit)

    cy.wrap(OrderStatus.ConfirmStock).chain(OrderDetailStatusTest)
    cy.getEl(CONFIRM_STOCK);
    cy.getEl(SUBMIT).click();
    cy.getEl(YES).click().should('not.exist')

    cy.wrap(OrderStatus.ConfirmShipping).chain(OrderDetailStatusTest)
    cy.getEl(CONFIRM_SHIPPING);
    cy.getEl(SUBMIT).click();
    cy.getEl(YES).click().should('not.exist')

    cy.wrap(OrderStatus.Completed).chain(OrderDetailStatusTest)
});


it('Order Detail Page -> Hide Order Confirmation -> When logged in as customer, the Order Confirmation section is hidden #working', () => {

    cy
        .pipe(cySetCustomerLoginToken)
        .chain(cyCreateOrder).its('orderId').as('orderId')
        .chain(orderUrl.detail).its('as')
        .pipe(cy.visit)
        .wrap(OrderStatus.ConfirmStock).chain(OrderDetailStatusTest)

        .pipe(HiddenConfirmStockComponentTest)

        .pipe(cySetAdminLoginToken)
        .get('@orderId')
        .chain(stockOk)
        .get('@orderId').chain(orderUrl.detail).its('as')
        .pipe(cy.visit)
        .chain(cySetCustomerLoginToken)
        .wrap(OrderStatus.ConfirmShipping).chain(OrderDetailStatusTest)

        .pipe(HiddenConfirmShippingComponentTest)
});


it('Order Detail Page -> Access Denied -> When user is not logged in and access Order Detail Page, then user is redirected to Login Page #working', () => {

    cy.visit(orderUrl.baseUrl);
    cy.load(customerUrl.login(orderUrl.baseUrl));
});


it('Order Detail Page -> Access Denied -> When user logs in as customer and accesses Order Detail Page of another customer, then user is redirected to Home Page #working', () => {

    cy
        .pipe(mockRandomCustomer)
        .pipe(createCustomer)
        .its('content.loginToken')
        .chain(setLoginToken)
        .chain(cyCreateOrder).its('orderId').as('orderId')

        .chain(cySetCustomerLoginToken)
        .get('@orderId').chain(orderUrl.detail).its('as')
        .pipe(cy.visit)
    cy.getEl(DESCRIPTION).should('have.text', 'order not found.')
    cy.load('/');



});
