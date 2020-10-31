import { customerUrl } from "../../modules/customer/customer.model";
import { orderUrl } from "../../modules/order/order.model";
import { removeLoginToken, setLoginToken } from "../../modules/shared/helpers/token.helper";
import { BACK, COUNT, tag, ITEM, REMOVE, SAVE_ITEM_FOR_LATER, SHOPPING_CART, SUBMIT, WISHLIST } from "../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, IShopingCartItem, shoppingCartUrl } from "../../modules/shopping-cart/shopping-cart.model";
import { cyGetExistingProduct } from "../helpers/product/create/create-product.component.spec";
import { cySetCustomerLoginToken } from "../helpers/shared/helpers/auth.helper";
import { ShoppingCartItemDetailTest } from "../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { cartItemShouldBeRemoved, cyAddToCart } from "../helpers/shopping-cart/detail/shopping-cart.component.spec";

it('Shopping Cart Page -> Remove Item Button -> When user clicks Remove Item button, the corresponding item should be removed from cart #e2e-working #visual-working', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '**').as('route')
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, true)).its('content.loginToken').chain(setLoginToken)
    .visit(shoppingCartUrl.baseUrl);

  cy.getEl(REMOVE).takeScreenShot('Shopping Cart Page')
  cy.getEl(REMOVE).click().wait('@route')
    .its('responseBody.content').pipe(cartItemShouldBeRemoved)
});

it('Shopping Cart Page -> Add To Wishlist Button -> When user clicks Remove Item button, the corresponding item should be moved to wish list #e2e-working', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, true)).as('addResponse')
    .its('content.loginToken').chain(setLoginToken)
    .get('@addResponse').its('content.item').as('item')
    .visit(shoppingCartUrl.baseUrl)
  cy.getEl(SAVE_ITEM_FOR_LATER).click()
  cy.getEl(COUNT).should('have.text', 0);
  cy.get('@item').chain(cartItemShouldBeRemoved);
  cy.getEl(WISHLIST).click().getLink().load().wait('@route');
  cy.get('@item').chain(ShoppingCartItemDetailTest);
});

it('Shopping Cart Page -> Checkout Button -> When there are no items in cart, then Checkout Button is disabled #e2e-working', () => {
  cy.visit(shoppingCartUrl.baseUrl);
  cy.getEl(SUBMIT).should('be.disabled');
});

it('Shopping Cart Page -> Checkout Button -> When there are items in cart, then Checkout Button is enabled #e2e-working', () => {
  cy.wrap(cyAddToCart(cyGetExistingProduct(), 1, true)).its('content.loginToken').chain(setLoginToken);
  cy.visit(shoppingCartUrl.baseUrl);
  cy.getEl(SUBMIT).should('not.be.disabled');
});

it('Shopping Cart Page -> Back To Shop Button -> When Back To Shop Button is clicked, then user is redirected to homepage #e2e-working', () => {
  cy.visit(shoppingCartUrl.baseUrl);
  cy.getEl(BACK).click().wrap('/').load();
});

it('Shopping Cart Page -> Checkout Button -> When user is logged in, clicks Checkout Button, and there are items in cart, then user is redirected to checkout page #e2e-working', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
    .pipe(cySetCustomerLoginToken)
    .then(() => cyAddToCart(cyGetExistingProduct(), 1, true))
    .visit(shoppingCartUrl.baseUrl).wait('@route')
  cy.getEl(SUBMIT).should('not.be.disabled').click().wrap(orderUrl.new).load();
});

it('Shopping Cart Page -> Checkout Button -> When user is not logged in, clicks Checkout Button, and there are items in cart, then user is redirected to login page with checkout page as return URL #e2e-working', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
  cy.wrap(cyAddToCart(cyGetExistingProduct(), 1, true)).its('content.loginToken').chain(setLoginToken)
    .visit(shoppingCartUrl.baseUrl).wait('@route')

  cy.getEl(SUBMIT).should('not.be.disabled').click()
    .wrap(customerUrl.login(orderUrl.new)).load();
});
