import { LOGIN, SUBMIT, ORDER, ID, CONFIRM_STOCK, YES, CONFIRM_SHIPPING, ORDER_SUMMARY, STATUS, tag } from "../../../../modules/shared/tag/tag.model";
import { orderUrl } from "../../../../modules/order/order.model";
import { typeLogin } from "../../customer/login/login.component.spec";
import { mockRootAdminAccount } from "../../shared/helpers/auth.helper";

export function OrderCompletionTest(orderId: number) {

    cy.getEl(LOGIN).click().getLink().load();
    cy.pipe(mockRootAdminAccount).pipe(typeLogin);
    cy.getEl(SUBMIT).click();
    cy.load('/');

    cy.getEl(ORDER).click().getLink().load();
    cy.getEl(tag(ID, orderId, ORDER)).click();
    cy.load(orderUrl.detail(orderId).as);

    cy.getEl(CONFIRM_STOCK);
    cy.getEl(SUBMIT).click();
    cy.getEl(YES).click();

    cy.getEl(CONFIRM_SHIPPING);
    cy.getEl(SUBMIT).click();
    cy.getEl(YES).click();

    cy.getEl(ORDER_SUMMARY).click();
    cy.getEl(tag(ORDER, '', STATUS)).should('have.text', 'Order completed');
}


export function OrderDetailStatusTest(orderStatus: string) {

    cy.getEl(ORDER_SUMMARY).click();
    cy.getEl(tag(ORDER, '', STATUS)).should('have.text', orderStatus);
}