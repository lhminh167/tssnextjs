import { OrderCreateRequest } from "../../../../modules/order/create/create-order.model";
import { Order } from "../../../../modules/order/order.model";
import { createOrder, createPayment, getOrderCreateForm } from "../../../../modules/order/order.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { cyGetExistingProduct } from "../../product/create/create-product.component.spec";
import { cyGetExistingCustomer } from "../../shared/helpers/auth.helper";
import { cyAddToCart } from "../../shopping-cart/detail/shopping-cart.component.spec";

export async function cyCreateOrder(input: OrderCreateRequest = {}): Promise<Order> {
    const user = cyGetExistingCustomer();
    const { content: form } = await getOrderCreateForm();
    const shipping = form.shippings[0];
    const request: OrderCreateRequest = {
        ...user,
        customerId: toNumber(user.customerId),
        shippingId: shipping.shippingId,
        shippingRegionId: shipping.shippingRegionId,
        paymentMethodId: 'pm_card_visa',
        ...input
    };
    const payment = await createPayment(request);
    // if (payment.content.paymentStatus === 'requires_action') {  
    //     const { error, paymentIntent } = await stripe.confirmCardPayment(payment.content.paymentSecret);
    //     if (!paymentIntent) return;
    // }
    request.paymentId = payment.content.paymentId;
    request.paymentSecret = payment.content.paymentSecret;
    const { content: { order } } = await createOrder(request);

    return order;
}

