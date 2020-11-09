import { customerUrl } from "../../modules/customer/customer.model";
import { createCustomer } from "../../modules/customer/customer.service";
import { orderUrl } from "../../modules/order/order.model";
import { getProduct } from "../../modules/product/detail/product-detail.service";
import { removeLoginToken, setLoginToken } from "../../modules/shared/helpers/token.helper";
import { BACK, COUNT, tag, ITEM, REMOVE, SAVE_ITEM_FOR_LATER, SHOPPING_CART, SUBMIT, WISHLIST, RECOMMENDATION } from "../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, IShopingCartItem, shoppingCartUrl } from "../../modules/shopping-cart/shopping-cart.model";
import { cyCreateOrder } from "../helpers/order/create/create-order.component.spec";
import { cyCreateRandomProduct, cyGetExistingProduct } from "../helpers/product/create/create-product.component.spec";
import { cySetCustomerLoginToken, mockRandomCustomer } from "../helpers/shared/helpers/auth.helper";
import { cyIt } from "../helpers/shared/helpers/other.helper";
import ProductListTest from "../helpers/shared/product-list/product-list.component.spec";
import { ShoppingCartItemDetailTest } from "../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { cartItemShouldBeRemoved, cyAddToCart } from "../helpers/shopping-cart/detail/shopping-cart.component.spec";

cyIt.run('Shopping Cart Page -> Remove Item Button -> When user clicks Remove Item button, the corresponding item should be removed from cart #e2e-working #visual-working', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '**').as('route')
    .wrap(cyAddToCart(cyGetExistingProduct(), 1, true)).its('content.loginToken').chain(setLoginToken)
    .visit(shoppingCartUrl.baseUrl);

  cy.getEl(REMOVE).takeScreenShot('Shopping Cart Page')
  cy.getEl(REMOVE).click().wait('@route')
    .its('responseBody.content').pipe(cartItemShouldBeRemoved)
});

cyIt.run('Shopping Cart Page -> Add To Wishlist Button -> When user clicks Remove Item button, the corresponding item should be moved to wish list #e2e-working', () => {
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

cyIt.run('Shopping Cart Page -> Checkout Button -> When there are no items in cart, then Checkout Button is disabled #e2e-working', () => {
  cy.visit(shoppingCartUrl.baseUrl);
  cy.getEl(SUBMIT).should('be.disabled');
});

cyIt.run('Shopping Cart Page -> Checkout Button -> When there are items in cart, then Checkout Button is enabled #e2e-working', () => {
  cy.wrap(cyAddToCart(cyGetExistingProduct(), 1, true)).its('content.loginToken').chain(setLoginToken);
  cy.visit(shoppingCartUrl.baseUrl);
  cy.getEl(SUBMIT).should('not.be.disabled');
});

cyIt.run('Shopping Cart Page -> Back To Shop Button -> When Back To Shop Button is clicked, then user is redirected to homepage #e2e-working', () => {
  cy.visit(shoppingCartUrl.baseUrl);
  cy.getEl(BACK).click().wrap('/').load();
});

cyIt.run('Shopping Cart Page -> Checkout Button -> When user is logged in, clicks Checkout Button, and there are items in cart, then user is redirected to checkout page #e2e-working', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
    .pipe(cySetCustomerLoginToken)
    .then(() => cyAddToCart(cyGetExistingProduct(), 1, true))
    .visit(shoppingCartUrl.baseUrl).wait('@route')
  cy.getEl(SUBMIT).should('not.be.disabled').click().wrap(orderUrl.new).load();
});

cyIt.run('Shopping Cart Page -> Checkout Button -> When user is not logged in, clicks Checkout Button, and there are items in cart, then user is redirected to login page with checkout page as return URL #e2e-working', () => {
  cy.server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
  cy.wrap(cyAddToCart(cyGetExistingProduct(), 1, true)).its('content.loginToken').chain(setLoginToken)
    .visit(shoppingCartUrl.baseUrl).wait('@route')

  cy.getEl(SUBMIT).should('not.be.disabled').click()
    .wrap(customerUrl.login(orderUrl.new)).load();
});

cyIt.run('Shopping Cart Page -> Recommendations -> When user accesses Shopping Cart Page, then Recommendations section shows products that were ordered together with products in this shopping cart within the last month #e2e-working', () => {
  const user1 = mockRandomCustomer();
  cy
    .pipe(cyCreateRandomProduct).its('productId')
    .pipe(getProduct).its('content').as('product1')

    .pipe(cyCreateRandomProduct).its('productId')
    .pipe(getProduct).its('content').as('product2')

    .chain(removeLoginToken).wrap(user1).pipe(createCustomer).its('content')
    .as('customerRes1').its('loginToken').chain(setLoginToken)

    .get('@product1').then(res => cyAddToCart(res, 1, true))
    .get('@product2').then(res => cyAddToCart(res, 1, true))

    .get('@customerRes1').its('customer')
    .then(res => ({ ...user1, customerId: res.customerId }))
    .pipe(cyCreateOrder)

    .chain(removeLoginToken).pipe(mockRandomCustomer)
    .pipe(createCustomer).its('content.loginToken').chain(setLoginToken)

    .get('@product1').then(res => cyAddToCart(res, 1, true))

    .visit(shoppingCartUrl.baseUrl)
  cy
    .getEl(RECOMMENDATION).within(() => {
      cy.get('@product2')
        .then(product2 => [product2])
        .pipe(ProductListTest)
    })
});
