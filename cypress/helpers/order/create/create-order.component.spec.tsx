import { OrderCreateRequest, OrderCreateResponse } from "../../../../modules/order/create/create-order.model";
import { Order } from "../../../../modules/order/order.model";
import { createOrder, createPayment, getOrderCreateForm } from "../../../../modules/order/order.service";
import { IResponse } from "../../../../modules/shared/crud/crud.model";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { cyGetExistingProduct } from "../../product/create/create-product.component.spec";
import { logApi } from "../../shared/crud/crud.service";
import { cyGetExistingCustomer } from "../../shared/helpers/auth.helper";
import { cyAddToCart } from "../../shopping-cart/detail/shopping-cart.component.spec";

export function cyCreateOrder(input: OrderCreateRequest = {}): Cypress.Chainable<Order> {
    const user = cyGetExistingCustomer();
    return cy
        .pipe(getOrderCreateForm).pipe(logApi).its('content')
        .then(form => form.shippings[0])
        .then(shipping => ({
            ...user,
            customerId: toNumber(user.customerId),
            shippingId: shipping.shippingId,
            shippingRegionId: shipping.shippingRegionId,
            paymentMethodId: 'pm_card_visa',
            ...input
        })).as('paymentRequest')
        .pipe(createPayment).pipe(logApi)
        .then((payment: IResponse<OrderCreateResponse>) =>
            cy.get('@paymentRequest').then(request => ({
                ...request,
                paymentId: payment.content.paymentId,
                paymentSecret: payment.content.paymentSecret,
            }))
        )
        .chain(createOrder).chain(logApi).its('content.order')
}

