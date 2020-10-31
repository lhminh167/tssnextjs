import { apiCustomerUrl, customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer } from "../../../modules/customer/customer.service";
import { HttpMethod } from "../../../modules/shared/crud/crud.model";
import { setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { LOGIN_LINK, SUBMIT } from "../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, shoppingCartUrl } from "../../../modules/shopping-cart/shopping-cart.model";
import { addShoppingCartItem } from "../../../modules/shopping-cart/shopping-cart.service";
import { registerTextFields, typeRegister } from "../../helpers/customer/create/create-customer.component.spec";
import UserDetailTest from "../../helpers/customer/detail/customer-detail.component.spec";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { cySetCustomerLoginToken, mockRandomAccount, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { ShoppingCartItemDetailTest } from "../../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { fromProductToCartItem } from "../../helpers/shopping-cart/detail/shopping-cart.component.spec";

it('Register Page -> Register -> When not-logged-in user accesses Register Page, then user can register a new account #e2e-working #visual-working', () => {
    const user = mockRandomAccount();
    cy
        .server().route({ url: apiCustomerUrl.register, method: HttpMethod.POST }).as('route')
        .visit(customerUrl.register())
        .clearTextFields(registerTextFields).takeScreenShot('Register Page')
        .wrap(user)
        .chain(typeRegister)
    cy
        .getEl(SUBMIT).click()
        .wait('@route').its('responseBody.content.customer').as('user')
        .wrap('/').load();

    cy
        .get('@user').its('customerId').chain(customerUrl.detail).its('as')
        .pipe(cy.visit).wrap(user)
        .chain(UserDetailTest);
});

it('Register Page -> Access Denied -> When logged-in user accesses Register Page, then user is redirected to Home Page #e2e-working', () => {
    cy
        .pipe(cySetCustomerLoginToken)
        .visit(customerUrl.login())
        .wrap('/').load();
});


it('Register Page -> Login Link -> When user clicks Login Link, then user is redirected to Login Page #e2e-working', () => {
    cy.visit(customerUrl.register())
    cy.getEl(LOGIN_LINK).click().getLink().load();
});

it('Register Page -> Anonymous Shopping Cart -> Given anonymous user has some items in shopping cart, when user registers, then anonymous cart items are added to the account user used to log in #e2e-working', () => {
    const item = fromProductToCartItem(cyGetExistingProduct(), 2, true);
    cy
        .wrap(item).pipe(addShoppingCartItem)
        .its('content.loginToken').chain(setLoginToken)

        .pipe(mockRandomCustomer).chain(createCustomer)
        .its('content.loginToken').chain(setLoginToken)

        .server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
        .visit(shoppingCartUrl.baseUrl)

        .wait('@route').its('responseBody.content.items')
        .pipe(res => ({
            ...item,
            itemId: res[0].itemId,
        }))
        .chain(ShoppingCartItemDetailTest);
});

it('Register Page -> Anonymous Wish List -> Given anonymous user has some items in wish list, when user logs in, then anonymous wish list items are added to the account user used to log in #e2e-working', () => {
    const item = fromProductToCartItem(cyGetExistingProduct(), 2, false);
    cy
        .wrap(item).pipe(addShoppingCartItem)
        .its('content.loginToken').chain(setLoginToken)


        .pipe(mockRandomCustomer).pipe(createCustomer)
        .its('content.loginToken').chain(setLoginToken)

        .server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
        .visit(shoppingCartUrl.wishList)

        .wait('@route').its('responseBody.content.items')
        .pipe(res => ({
            ...item,
            itemId: res[0].itemId,
        }))
        .chain(ShoppingCartItemDetailTest);
});
