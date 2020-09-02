import { orderUrl } from "../../../modules/order/order.model";
import { ADD_TO_CART, BACK, COLOR, CONFIRM_SHIPPING, CONFIRM_STOCK, GRAND_TOTAL, ID, LOGIN, LOGOUT, ORDERS, ORDER_STATUS, ORDER_SUMMARY, PRODUCT_CARD, PRODUCT_LINK, REGISTER_LINK, SHOPPING_CART, SHOPPING_CART_ITEM, SIZE, SUBMIT, YES } from "../../../modules/shared/tag/tag.model";
import { getRootAdminAccount, randomString } from "../../support/commands";

describe('Use cases', () => {
    before(() => {
        cy.clearLocalStorage('loginToken');
        cy.visit('/');
        cy.load('/');
    })

    it('allows visitor to create and complete an order', () => {
        cy.getEl(PRODUCT_CARD).first().click();

        cy.getEl(PRODUCT_LINK).first().getLink().load();
        cy.getEl(SIZE).last().click();
        cy.getEl(COLOR).last().click();
        cy.getEl(ADD_TO_CART).click();
        cy.getEl(SHOPPING_CART).click();
        cy.getEl(SHOPPING_CART).getLink().load();

        cy.getEl(SHOPPING_CART_ITEM);
        cy.getEl(SUBMIT).click();
        cy.load('/user/login?next=/order/new');

        cy.getEl(REGISTER_LINK).click();
        cy.getEl(REGISTER_LINK).getLink().load();

        const randomStr = randomString(5);
        cy.typeRegister({
            name: randomStr,
            email: randomStr + '@mail.com',
            password: randomStr
        });
        cy.getEl(SUBMIT).click();
        cy.load('/order/new');

        cy.typeCheckout({
            address1: randomStr,
            address2: randomStr,
            city: randomStr,
            region: randomStr,
            postalCode: randomStr,
            country: randomStr,
            mobPhone: randomStr,
            dayPhone: randomStr,
            evePhone: randomStr,
            shippingId: 2,
        });
        cy.getEl(SUBMIT).click();

        cy.getEl(ORDER_SUMMARY);
        cy.getEl(GRAND_TOTAL).should('not.eq', '$0.00');
        cy.getEl(SUBMIT).click();

        cy.getWithinIframe('[name="cardnumber"]').type('4242424242424242');
        cy.getWithinIframe('[name="exp-date"]').type('1232');
        cy.getWithinIframe('[name="cvc"]').type('987');
        cy.getWithinIframe('[name="postal"]').type('12345');
        cy.getEl(SUBMIT).click();

        cy.getEl(ID, { timeout: 600000 }).invoke('text').then(parseFloat).should('be.gt', 0).then(orderId => {
            cy.getEl(BACK).click().getLink().load();
            cy.getEl(LOGOUT).click();
            AdminOrderCompletionTest(orderId);
        });


    })
})

export function AdminOrderCompletionTest(orderId: number) {

    cy.getEl(LOGIN, { timeout: 600000 }).click().getLink().load();
    cy.typeLogin(getRootAdminAccount());
    cy.getEl(SUBMIT).click();
    cy.load('/');

    cy.getEl(ORDERS).click().getLink().load();
    cy.getEl(ID).contains(orderId).click();
    cy.load(orderUrl.detail(orderId).as);

    cy.getEl(CONFIRM_STOCK);
    cy.getEl(SUBMIT).click();
    cy.getEl(YES).click();

    cy.getEl(CONFIRM_SHIPPING);
    cy.getEl(SUBMIT).click();
    cy.getEl(YES).click();

    cy.getEl(ORDER_SUMMARY).click();
    cy.getEl(ORDER_STATUS).should('have.text', 'Order Completed');
}