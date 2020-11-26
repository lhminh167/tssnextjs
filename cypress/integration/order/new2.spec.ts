import { customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer, getCustomer } from "../../../modules/customer/customer.service";
import { apiOrderUrl, orderUrl } from "../../../modules/order/order.model";
import { HttpMethod } from "../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../modules/shared/crud/crud.service";
import { setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { ADD_TO_CART, BACK, COLOR, DESCRIPTION, GRAND_TOTAL, ID, ITEM, LOGOUT, NAME, ORDER, ORDER_SUMMARY, PRODUCT_CARD, PRODUCT_LINK, REGISTER_LINK, SHIPPING, SHOPPING_CART, SIZE, SUBMIT, tag, TOTAL_QUANTITY, USER, YES } from "../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, shoppingCartUrl } from "../../../modules/shopping-cart/shopping-cart.model";
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

cyIt.run('Checkout Page -> Back Buttons -> When user is at Payment Form and keeps clicking Back Buttons, then user is back to previous pages and eventually arrives at Shopping Cart Page #e2e-working', () => {
  cySetCustomerLoginToken();
  cy
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, true))
    .visit(shoppingCartUrl.baseUrl)
    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()
    .pipe(cyFinishDeliveryForm)
    .pipe(cyFinishConfirmationForm)

  cy.getEl(BACK).click();
  cy.getEl(ORDER_SUMMARY);
  cy.getEl(GRAND_TOTAL).should('not.eq', '$0.00');

  cy.getEl(BACK).click().clearTextFields([NAME])

  cy.getEl(BACK).click().wrap(shoppingCartUrl.baseUrl).load();
})

cyIt.run('Checkout Page -> Payment Form -> Insufficient Funds -> When user enters an insufficient funded credit card, an error message should be shown #e2e-working', () => {
  cySetCustomerLoginToken();
  cy
    .server().route({ url: getUrl(apiOrderUrl.payment), method: HttpMethod.POST }).as('route')
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, true))
    .visit(shoppingCartUrl.baseUrl)
    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()
    .pipe(cyFinishDeliveryForm)
    .pipe(cyFinishConfirmationForm)
    .pipe(getInsufficientFundsPaymentInfo)
    .pipe(typePaymentForm)
  cy.getEl(SUBMIT).click().wait('@route');
  cy.getEl(DESCRIPTION).should('have.text', 'Your card has insufficient funds.')
  cy.getEl(YES).click()
    .pipe(getSuccessPaymentInfo)
    .pipe(typePaymentForm)
})


cyIt.run('Checkout Page -> Payment Form -> 3D Secure Auth Success -> When user uses a 3D Secure Credit Card and succeeds to authorize, then user can proceed to Order Finish Form #e2e-working', () => {
  cySetCustomerLoginToken();
  cy
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, true))
    .visit(shoppingCartUrl.baseUrl)
    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()
    .pipe(cyFinishDeliveryForm)
    .pipe(cyFinishConfirmationForm)
    .pipe(get3DSecurePaymentInfo)
    .pipe(typePaymentForm)
  cy
    .getEl(SUBMIT).click().wait(5000)
    .pipe(getChallengeFrame).find('#test-source-authorize-3ds').click()
  cy
    .getEl(ID).invoke('text')
    .then(parseFloat).should('be.gt', 0)

})

cyIt.run('Checkout Page -> Payment Form -> 3D Secure Auth Failure -> When user uses a 3D Secure Credit Card and fails to authorize, then user cannot proceed to Order Finish Form #e2e-working', () => {
  cySetCustomerLoginToken();
  cy
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, true))
    .visit(shoppingCartUrl.baseUrl)
    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()
    .pipe(cyFinishDeliveryForm)
    .pipe(cyFinishConfirmationForm)
    .pipe(get3DSecurePaymentInfo)
    .pipe(typePaymentForm)
  cy
    .getEl(SUBMIT).click().wait(5000)
    .pipe(getChallengeFrame).find('#test-source-fail-3ds').click()
    .pipe(getSuccessPaymentInfo)
    .pipe(typePaymentForm)
})

