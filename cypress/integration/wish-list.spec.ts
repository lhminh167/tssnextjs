import { BACK, COUNT, tag, ITEM, MOVE_ITEM_TO_CART, REMOVE, SHOPPING_CART, SUBMIT, WISHLIST } from "../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, shoppingCartUrl } from "../../modules/shopping-cart/shopping-cart.model";
import { cyGetExistingProduct } from "../helpers/product/create/create-product.component.spec";
import { ShoppingCartItemDetailTest } from "../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { cartItemShouldBeRemoved, cyAddToCart } from "../helpers/shopping-cart/detail/shopping-cart.component.spec";

it('Wish List Page -> Back To Shop Button -> When Back To Shop Button is clicked, then user is redirected to homepage', () => {
  cy.visit(shoppingCartUrl.wishList);
  cy.getEl(BACK).click().wrap('/').load();
});

it('Wish List Page -> Remove Item Button -> When user clicks Remove Item button, the corresponding item should be removed from wish list', () => {
  cy
    .server().route(apiShoppingCartUrl.baseUrl + '**').as('route')
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, false))
  cy.visit(shoppingCartUrl.wishList);
  cy.getEl(REMOVE).click().wait('@route')
    .its('responseBody.content').pipe(cartItemShouldBeRemoved)
});

it('Wish List Page -> Move Item To Cart Button -> When user clicks Move Item To Cart Button button, the corresponding item should be moved to cart', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, false))
    .its('content.item').as('item')
    .visit(shoppingCartUrl.wishList)
  cy.getEl(MOVE_ITEM_TO_CART).click()
  cy.getEl(COUNT).should('have.text', 0);
  cy.get('@item').chain(cartItemShouldBeRemoved);
  cy.getEl(SHOPPING_CART).click().getLink().load().wait('@route');
  cy.get('@item').chain(ShoppingCartItemDetailTest);
});


it('Wish List Page -> Back To Shop Button -> When Back To Shop Button is clicked, then user is redirected to homepage', () => {
  cy.visit(shoppingCartUrl.wishList);
  cy.getEl(BACK).click().wrap('/').load();
});

it('Wish List Page -> Go To Cart Button -> When user is not logged in, clicks Go To Cart Button, and there are items in cart, then user is redirected to login page with checkout page as return URL', () => {
  cy
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, false))
    .visit(shoppingCartUrl.wishList)
    .getEl(SUBMIT).click().wrap(shoppingCartUrl.baseUrl).load();
});
