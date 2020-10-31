import { OrderCreateRequest } from "../../../../../modules/order/create/create-order.model";
import { orderUrl } from "../../../../../modules/order/order.model";
import { ADDRESS_1, ADDRESS_2, CITY, COUNTRY, DAY_PHONE, EVE_PHONE, GRAND_TOTAL, MOB_PHONE, NAME, ORDER_SUMMARY, POSTALCODE, REGION, SHIPPING, SUBMIT } from "../../../../../modules/shared/tag/tag.model";
import { cyGetExistingProduct } from "../../../product/create/create-product.component.spec";
import { cySetCustomerLoginToken } from "../../../shared/helpers/auth.helper";
import { cyAddToCart } from "../../../shopping-cart/detail/shopping-cart.component.spec";

export const deliveryFormTextFields = [
    NAME,
    ADDRESS_1,
    ADDRESS_2,
    CITY,
    REGION,
    POSTALCODE,
    COUNTRY,
    MOB_PHONE,
    DAY_PHONE,
    EVE_PHONE,
];

export function typeDeliveryForm(user: OrderCreateRequest) {

    cy.fillTextFields(deliveryFormTextFields, user);
    cy.getEl(SHIPPING).click();
    cy.getEl(SHIPPING + user.shippingId).click();
}

export function cySetupDeliveryForm() {
    const product = cyGetExistingProduct();
    return cy
        .pipe(cySetCustomerLoginToken)
        .wrap(cyAddToCart(product, 1, true))
}

export function cyGoToDeliveryForm() {
    return cy
        .pipe(cySetupDeliveryForm)
        .visit(orderUrl.new)
}

export function cyFinishDeliveryForm() {
    cy.getEl(SUBMIT).click();
    cy.getEl(ORDER_SUMMARY);
    cy.getEl(GRAND_TOTAL).should('not.eq', '$0.00');
    return cy;
}