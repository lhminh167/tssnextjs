import { setLoginToken } from "../../modules/shared/helpers/token.helper";
import { BACK, COUNT, tag, ITEM, MOVE_ITEM_TO_CART, REMOVE, SHOPPING_CART, SUBMIT, WISHLIST } from "../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, shoppingCartUrl } from "../../modules/shopping-cart/shopping-cart.model";
import { cyGetExistingProduct } from "../helpers/product/create/create-product.component.spec";
import { cyIt } from "../helpers/shared/helpers/other.helper";
import { ShoppingCartItemDetailTest } from "../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { cartItemShouldBeRemoved, cyAddToCart } from "../helpers/shopping-cart/detail/shopping-cart.component.spec";

cyIt.run('Wish List Page -> Back To Shop Button -> When Back To Shop Button is clicked, then user is redirected to homepage #priority-3-working #e2e-working', () => {
  cy.visit(shoppingCartUrl.wishList);
  cy.getEl(BACK).click().wrap('/').load();
});

cyIt.run('Wish List Page -> Remove Item Button -> When user clicks Remove Item button, the corresponding item should be removed from wish list #priority-1-working #e2e-working #visual-working', () => {
  cy
    .server().route(apiShoppingCartUrl.baseUrl + '**').as('route')
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, false)).its('content.loginToken').chain(setLoginToken)
    .visit(shoppingCartUrl.wishList).wait('@route');

  cy.getEl(REMOVE).takeScreenShot('Wish List Page')
  cy.getEl(REMOVE).click().wait('@route')
    .its('responseBody.content').pipe(cartItemShouldBeRemoved)
});

cyIt.run('Wish List Page -> Move Item To Cart Button -> When user clicks Move Item To Cart Button button, the corresponding item should be moved to cart #priority-1-working #e2e-working', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, false)).as('addResponse')
    .its('content.loginToken').chain(setLoginToken)
    .get('@addResponse').its('content.item').as('item')
    .visit(shoppingCartUrl.wishList).wait('@route');

  cy.getEl(MOVE_ITEM_TO_CART).click()
  cy.getEl(COUNT).should('have.text', 0);
  cy.get('@item').chain(cartItemShouldBeRemoved);
  cy.getEl(SHOPPING_CART).click().getLink().load().wait('@route');
  cy.get('@item').chain(ShoppingCartItemDetailTest);
});

cyIt.run('Wish List Page -> Go To Cart Button -> When Back To Shop Button is clicked, then user is redirected to Shopping Cart Page #priority-3-working #e2e-working', () => {
  cy.visit(shoppingCartUrl.wishList);
  cy.getEl(SUBMIT).click().wrap(shoppingCartUrl.baseUrl).load();
});
