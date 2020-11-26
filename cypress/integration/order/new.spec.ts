import { customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer, getCustomer } from "../../../modules/customer/customer.service";
import { apiOrderUrl, orderUrl } from "../../../modules/order/order.model";
import { getOrder } from "../../../modules/order/order.service";
import { HttpMethod } from "../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../modules/shared/crud/crud.service";
import { setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { ADD_TO_CART, BACK, COLOR, DESCRIPTION, GRAND_TOTAL, ID, ITEM, LOGOUT, NAME, ORDER, ORDER_SUMMARY, PRODUCT_CARD, PRODUCT_LINK, REGISTER_LINK, SHIPPING, SHOPPING_CART, SIZE, SUBMIT, tag, TOTAL_QUANTITY, USER, YES } from "../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, defaultShopingCartGetRequest, ShopingCartGetRequest, shoppingCartUrl } from "../../../modules/shopping-cart/shopping-cart.model";
import { getShoppingCart } from "../../../modules/shopping-cart/shopping-cart.service";
import { typeRegister } from "../../helpers/customer/create/create-customer.component.spec";
import UserDetailTest from "../../helpers/customer/detail/customer-detail.component.spec";
import { cyFinishConfirmationForm } from "../../helpers/order/create/confirmation-form/confirmation-form.component.spec";
import { cyFinishDeliveryForm, deliveryFormTextFields, typeDeliveryForm } from "../../helpers/order/create/delivery-form/delivery-form.component.spec";
import { cyCompleteFinishForm } from "../../helpers/order/create/finish-form/finish-form.component.spec";
import { get3DSecurePaymentInfo, getChallengeFrame, getInsufficientFundsPaymentInfo, getSuccessPaymentInfo, typePaymentForm } from "../../helpers/order/create/payment-form/payment-form.component.spec";
import { OrderCompletionTest, OrderDetailStatusTest, OrderStatus } from "../../helpers/order/detail/order-detail.component.spec";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { cyGetExistingCustomer, cySetCustomerLoginToken, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { UserPopoverDetailTest } from "../../helpers/shared/navbar/desktop-navbar.component.spec";
import { cyAddToCart, cyGetAnyCartItem, finishShoppingCartPage } from "../../helpers/shopping-cart/detail/shopping-cart.component.spec";

cyIt.run('Checkout Page -> Complete Checkout -> When user logged in and shopping cart is not empty, then user can complete Checkout Form to place an order #e2e-working #visual-working', () => {

  cy.server()
    .pipe(mockRandomCustomer).chain(createCustomer).its('content').as('customerRes')
    .its('loginToken').chain(setLoginToken)

    .then(() => cyAddToCart(cyGetExistingProduct(), 1, true)).its('content.item.itemId').as('itemId')
    .visit(shoppingCartUrl.baseUrl)

    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()

    .clearTextFields(deliveryFormTextFields).wait(4000)
    .takeScreenShot('Delivery Form')

    .get('@customerRes').its('customer.customerId').as('customerId')
    .then(customerId => ({ ...mockRandomCustomer(), customerId, shippingId: 2, })).as('customer')
    .chain(typeDeliveryForm)
    .pipe(cyFinishDeliveryForm)

  cy.get(`[data-cy*="${ITEM}"]`)
    .takeScreenShot('Confirmation Form').pipe(cyFinishConfirmationForm)
    .pipe(getSuccessPaymentInfo).pipe(typePaymentForm)
    .takeScreenShot('Payment Form')
  cy.getEl(SUBMIT).click();
  cy.getEl(ID).invoke('text').then(parseFloat).should('be.gt', 0).as('orderId')
    .takeScreenShot('Finish Form').pipe(cyCompleteFinishForm)

  cy.getEl(TOTAL_QUANTITY).should('have.text', 0)

    .wrap(defaultShopingCartGetRequest).pipe(getShoppingCart)
    .its('content.totalQuantity').should('have.value', 0)

    .get('@orderId').pipe(getOrder).its('content.orderStatus.message')
    .should('have.value', OrderStatus.ConfirmStock)

    .get('@customerId').pipe(getCustomer).its('content')
    .then(customer => cy.get('@customer').should('deep.equal', customer))
})
