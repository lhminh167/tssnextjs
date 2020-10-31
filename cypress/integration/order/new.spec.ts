import { customerUrl } from "../../../modules/customer/customer.model";
import { apiOrderUrl, orderUrl } from "../../../modules/order/order.model";
import { HttpMethod } from "../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../modules/shared/crud/crud.service";
import { ADD_TO_CART, BACK, COLOR, DESCRIPTION, GRAND_TOTAL, ID, ITEM, LOGOUT, ORDER, ORDER_SUMMARY, PRODUCT_CARD, PRODUCT_LINK, REGISTER_LINK, SHOPPING_CART, SIZE, SUBMIT, tag, TOTAL_QUANTITY, USER, YES } from "../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, shoppingCartUrl } from "../../../modules/shopping-cart/shopping-cart.model";
import { typeRegister } from "../../helpers/customer/create/create-customer.component.spec";
import { cyFinishConfirmationForm } from "../../helpers/order/create/confirmation-form/confirmation-form.component.spec";
import { cyFinishDeliveryForm, typeCheckout } from "../../helpers/order/create/delivery-form/delivery-form.component.spec";
import { cyCompleteFinishForm } from "../../helpers/order/create/finish-form/finish-form.component.spec";
import { cyFinishPaymentForm, get3DSecurePaymentInfo, getChallengeFrame, getInsufficientFundsPaymentInfo, getSuccessPaymentInfo, typePaymentForm } from "../../helpers/order/create/payment-form/payment-form.component.spec";
import { OrderCompletionTest, OrderDetailStatusTest, OrderStatus } from "../../helpers/order/detail/order-detail.component.spec";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { cySetCustomerLoginToken, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { cyAddToCart, cyGetAnyCartItem, finishShoppingCartPage } from "../../helpers/shopping-cart/detail/shopping-cart.component.spec";


it.skip('Checkout Page -> Order Completion -> Visitor who visits the website for the first time can complete an order #sanity #working', () => {

  const user = mockRandomCustomer();
  cy.visit('/').wrap('/').load();
  cy.getEl(PRODUCT_CARD).last().click()
  cy.getEl(PRODUCT_LINK).last().getLink().load()
  cy.getEl(SIZE).last().click()
  cy.getEl(COLOR).last().click()

  cy.getEl(ADD_TO_CART).click()
  cy.getEl(SHOPPING_CART).click().getLink().load();
  cy.server().route({ url: getUrl(apiShoppingCartUrl.baseUrl + '?**') }).as('cartItemListRoute')
    .wait('@cartItemListRoute', { timeout: 120000 })
    .pipe(cyGetAnyCartItem).should('exist');
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

  cy.getEl(ID).invoke('text').then(parseFloat).should('be.gt', 0).as('orderId')
  cy.getEl(BACK).click().getLink().load()
  cy.getEl(LOGOUT).click().shouldNotExist(USER)
  cy.get('@orderId').chain(OrderCompletionTest)
});

it('Checkout Page -> Complete Checkout -> When user logged in and shopping cart is not empty, then user can complete Checkout Form to place an order #working', () => {
  cySetCustomerLoginToken();
  cy.server()

    .wrap(cyAddToCart(cyGetExistingProduct(), 1, true)).its('content.item.itemId').as('itemId')
    .visit(shoppingCartUrl.baseUrl)

    .pipe(finishShoppingCartPage)
    .wrap(orderUrl.new).load()

    .pipe(cyFinishDeliveryForm)
    .pipe(cyFinishConfirmationForm)
    .pipe(cyFinishPaymentForm).as('orderId')
    .pipe(cyCompleteFinishForm)

  cy.getEl(TOTAL_QUANTITY).should('have.text', 0)
    .route(apiShoppingCartUrl.baseUrl + '**').as('route')

  cy.getEl(SHOPPING_CART).click().getLink().load().wait('@route')
    .get('@itemId').then((itemId: any) => tag(ITEM, itemId, SHOPPING_CART)).pipe(cy.shouldNotExist)
    .route(apiOrderUrl.baseUrl + '**').as('orderRoute')

  cy.getEl(ORDER).click().getLink().load().wait('@orderRoute')
    .get('@orderId').then((orderId: any) => tag(ID, orderId, ORDER)).pipe(cy.getEl).click()
    .get('@orderId').chain(orderUrl.detail).its('as').load()
    .wrap(OrderStatus.ConfirmStock).chain(OrderDetailStatusTest)
})

it('Checkout Page -> Back Buttons -> When user is at Payment Form and keeps clicking Back Buttons, then user is back to previous pages and eventually arrives at Shopping Cart Page #working', () => {
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
  //test delivery form

  cy.getEl(BACK).click().wrap(shoppingCartUrl.baseUrl).load();
})

it('Checkout Page -> Payment Form -> Insufficient Funds -> When user enters an insufficient funded credit card, an error message should be shown #working', () => {
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


it('Checkout Page -> Payment Form -> 3D Secure Auth Success -> When user uses a 3D Secure Credit Card and succeeds to authorize, then user can proceed to Order Finish Form #working', () => {
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
    .getEl(SUBMIT).click().wait(10000)
    .pipe(getChallengeFrame).find('#test-source-authorize-3ds').click()
  cy
    .getEl(ID).invoke('text')
    .then(parseFloat).should('be.gt', 0)

})

it('Checkout Page -> Payment Form -> 3D Secure Auth Failure -> When user uses a 3D Secure Credit Card and fails to authorize, then user cannot proceed to Order Finish Form #working', () => {
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
    .getEl(SUBMIT).click().wait(10000)
    .pipe(getChallengeFrame).find('#test-source-fail-3ds').click()
    .pipe(getSuccessPaymentInfo)
    .pipe(typePaymentForm)
})

