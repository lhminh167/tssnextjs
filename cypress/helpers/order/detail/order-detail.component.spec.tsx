import { LOGIN, SUBMIT, ORDER, ID, CONFIRM_STOCK, YES, CONFIRM_SHIPPING, ORDER_SUMMARY, STATUS, tag } from "../../../../modules/shared/tag/tag.model";
import { apiOrderUrl, orderUrl } from "../../../../modules/order/order.model";
import { typeLogin } from "../../customer/login/login.component.spec";
import { mockRootAdminAccount } from "../../shared/helpers/auth.helper";
import { getUrl } from "../../../../modules/shared/crud/crud.service";

export function OrderCompletionTest(orderId: number) {


    cy.getEl(LOGIN).click().getLink().load();
    cy.pipe(mockRootAdminAccount).pipe(typeLogin);
    cy.getEl(SUBMIT).click();
    cy.load('/');

    cy.getEl(ORDER).click().getLink().load();
    cy.getEl(tag(ID, orderId, ORDER)).click();
    cy.load(orderUrl.detail(orderId).as);
    cy.server().route({ url: getUrl(apiOrderUrl.detail(orderId).as) }).as('orderDetailRoute');
    // cy.wait('@orderDetailRoute', { timeout: 120000 });

    cy.getEl(CONFIRM_STOCK);
    cy.getEl(SUBMIT).click();
    cy.getEl(YES).click();

    cy.getEl(CONFIRM_SHIPPING);
    cy.getEl(SUBMIT).click();
    cy.getEl(YES).click()
    cy.wrap(OrderStatus.Completed).chain(OrderDetailStatusTest)
}


export function OrderDetailStatusTest(orderStatus: OrderStatus) {

    cy.getEl(ORDER_SUMMARY).click();
    cy.getEl(tag(ORDER, '', STATUS)).should('have.text', orderStatus);
}

export enum OrderStatus {
    Completed = 'Order completed',
    OutOfStock = 'Order canceled because some products are out of stock',
    ConfirmShipping = 'Awaiting shipment confirmation',
    ConfirmStock = 'Awaiting stock confirmation'
}