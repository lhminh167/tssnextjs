import { customerUrl } from "../../../modules/customer/customer.model";
import { orderUrl } from "../../../modules/order/order.model";
import { departmentUrl } from "../../../modules/shared/models/department.model";
import { ADD_TO_CART, BACK, COLOR, DESCRIPTION, GRAND_TOTAL, ID, ITEM, LOGOUT, ORDER_SUMMARY, PRODUCT_CARD, PRODUCT_LINK, REGISTER_LINK, SHOPPING_CART, SIZE, SUBMIT, YES } from "../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, shoppingCartUrl } from "../../../modules/shopping-cart/shopping-cart.model";
import { typeRegister } from "../../helpers/customer/create/create-customer.component.spec";
import { cyFinishConfirmationForm } from "../../helpers/order/create/confirmation-form/confirmation-form.component.spec";
import { cyCreateOrder } from "../../helpers/order/create/create-order.component.spec";
import { cyFinishDeliveryForm, typeCheckout } from "../../helpers/order/create/delivery-form/delivery-form.component.spec";
import { cyFinishPaymentForm, cyGoToPaymentForm, get3DSecurePaymentInfo, getChallengeFrame, getInsufficientFundsPaymentInfo, getSuccessPaymentInfo, typePaymentForm } from "../../helpers/order/create/payment-form/payment-form.component.spec";
import { OrderCompletionTest } from "../../helpers/order/detail/order-detail.component.spec";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { cySetCustomerLoginToken, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { cyAddToCart, finishShoppingCartPage } from "../../helpers/shopping-cart/detail/shopping-cart.component.spec";


it('Checkout Page -> Visitor can complete an order #sanity #working', () => {

  const user = mockRandomCustomer();
  cy.visit('/').wrap('/').load();
  cy.getEl(PRODUCT_CARD).last().click()
  cy.getEl(PRODUCT_LINK).last().getLink().load()
  cy.getEl(SIZE).last().click()
  cy.getEl(COLOR).last().click()

  cy.getEl(ADD_TO_CART).click()
  cy.getEl(SHOPPING_CART).click().getLink().load();
  cy.get(`[data-cy*="${ITEM}"]`).should('exist')
  cy.getEl(SUBMIT).click()

  cy.load(customerUrl.login(orderUrl.new))
  cy.getEl(REGISTER_LINK).click()
  cy.getEl(REGISTER_LINK).getLink().load()
  cy.wrap(user).chain(typeRegister)
  cy.getEl(SUBMIT).click()

  cy.load(orderUrl.new)
    .wrap({ ...user, shippingId: 2, })
    .chain(typeCheckout)
  cy.getEl(SUBMIT).click()

  cy.getEl(ORDER_SUMMARY).should('have.text', 'Order summary')
  cy.getEl(GRAND_TOTAL).should('not.eq', '$0.00')
  cy.getEl(SUBMIT).click()

  cy.pipe(getSuccessPaymentInfo).pipe(typePaymentForm)
  cy.getEl(SUBMIT).click()

  cy
    .getEl(ID).invoke('text')
    .then(parseFloat).should('be.gt', 0)
    .then(orderId => {
      cy.getEl(BACK).click().getLink().load()
      cy.getEl(LOGOUT).click()
      OrderCompletionTest(orderId)
    });
});


it('Checkout Page -> Back Buttons -> When user is at Payment Form add keeps clicking Back Buttons, then user is back to previou pages and eventually come to Shopping Cart Page #working', () => {
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

  cy.getEl(BACK).click();
  //tes delivery form

  cy.getEl(BACK).click().wrap(shoppingCartUrl.baseUrl).load();
})

it('Checkout Page -> Payment Form -> Insufficient Funds -> When user enters an insufficient funded credit card, an error message should be shown #working', () => {

  const product = cyGetExistingProduct();
  cy
    .wrap(cySetCustomerLoginToken)
    .wrap(cyAddToCart(product, 1, true))
    .visit(shoppingCartUrl.baseUrl)
    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()
    .pipe(cyFinishDeliveryForm)
    .pipe(cyFinishConfirmationForm)
    .pipe(getInsufficientFundsPaymentInfo)
    .pipe(typePaymentForm)
  cy.getEl(SUBMIT).click();
  cy.getEl(DESCRIPTION).should('have.text', 'One or more errors occurred. (Your card has insufficient funds.)')
  cy.getEl(YES).click()
    .pipe(getSuccessPaymentInfo)
    .pipe(typePaymentForm)
})


it('Checkout Page -> Payment Form -> 3D Secure Auth Success -> When user uses a 3D Secure Credit Card and succeeds to authorize, then user can proceed to Order Finish Form #working', () => {

  const product = cyGetExistingProduct();
  cy
    .wrap(cySetCustomerLoginToken)
    .wrap(cyAddToCart(product, 1, true))
    .visit(shoppingCartUrl.baseUrl)
    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()
    .pipe(cyFinishDeliveryForm)
    .pipe(cyFinishConfirmationForm)
    .pipe(get3DSecurePaymentInfo)
    .pipe(typePaymentForm)
  cy
    .getEl(SUBMIT).click().wait(10000)
    .pipe(getChallengeFrame).find('#test-source-authorize-3ds').click()
  cy
    .getEl(ID).invoke('text')
    .then(parseFloat).should('be.gt', 0)

})

it('Checkout Page -> Payment Form -> 3D Secure Auth Failure -> When user uses a 3D Secure Credit Card and fails to authorize, then user cannot proceed to Order Finish Form #working', () => {

  const product = cyGetExistingProduct();
  cy
    .wrap(cySetCustomerLoginToken)
    .wrap(cyAddToCart(product, 1, true))
    .visit(shoppingCartUrl.baseUrl)
    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()
    .pipe(cyFinishDeliveryForm)
    .pipe(cyFinishConfirmationForm)
    .pipe(get3DSecurePaymentInfo)
    .pipe(typePaymentForm)
  cy
    .getEl(SUBMIT).click().wait(10000)
    .pipe(getChallengeFrame).find('#test-source-fail-3ds').click()
  cy
    .pipe(getSuccessPaymentInfo)
    .pipe(typePaymentForm)
})

