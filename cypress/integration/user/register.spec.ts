import { apiCustomerUrl, customerUrl, ICreateCustomerRequest } from "../../../modules/customer/customer.model";
import { createCustomer } from "../../../modules/customer/customer.service";
import { HttpMethod } from "../../../modules/shared/crud/crud.model";
import { setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { DESCRIPTION, LOGIN_LINK, SUBMIT } from "../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, shoppingCartUrl } from "../../../modules/shopping-cart/shopping-cart.model";
import { addShoppingCartItem } from "../../../modules/shopping-cart/shopping-cart.service";
import { registerTextFields, typeRegister } from "../../helpers/customer/create/create-customer.component.spec";
import UserDetailTest from "../../helpers/customer/detail/customer-detail.component.spec";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { cyGetExistingCustomer, cySetCustomerLoginToken, mockRandomAccount, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { UserPopoverDetailTest } from "../../helpers/shared/navbar/desktop-navbar.component.spec";
import { ShoppingCartItemDetailTest } from "../../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { fromProductToCartItem } from "../../helpers/shopping-cart/detail/shopping-cart.component.spec";

cyIt.only('Register Page -> Register -> When not-logged-in user accesses Register Page, then user can register a new account and be redirected to return URL #priority-1-working #e2e-working #visual-working', () => {
    const user = mockRandomAccount();
    cy
        .server().route({ url: apiCustomerUrl.register, method: HttpMethod.POST }).as('route')
        .wrap(user.customerId).chain(customerUrl.detail).its('as').as('returnUrl')
        .chain(customerUrl.register)
        .chain(cy.visit)
        .clearTextFields(registerTextFields).takeScreenShot('Register Page')
        .wrap(user)
        .chain(typeRegister)
    cy
        .getEl(SUBMIT).click()
        .wait('@route').its('responseBody.content.customer').as('user')
        .get('@returnUrl').load();

    cy
        .get('@user').its('customerId').chain(customerUrl.detail).its('as')
        .pipe(cy.visit)
        .wrap(user).chain(UserDetailTest)
        .wrap(user).chain(UserPopoverDetailTest)
});

cyIt.run('Register Page -> Email Adready Taken -> When an email address was used by a user to register, then another user cannot use this email address to register #priority-2-working #e2e-working', () => {
    const user: ICreateCustomerRequest = {
        ...mockRandomAccount(),
        email: cyGetExistingCustomer().email
    };
    cy
        .server().route({ url: apiCustomerUrl.register, method: HttpMethod.POST }).as('route')
        .visit(customerUrl.register())
        .wrap(user).chain(typeRegister)
    cy
        .getEl(SUBMIT).click().wait('@route')
    cy
        .getEl(DESCRIPTION)
        .should('have.text', 'This email address is already taken. Please use another email address.')
});

cyIt.run('Register Page -> Access Denied -> When logged-in user accesses Register Page, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
    cy
        .pipe(cySetCustomerLoginToken)
        .visit(customerUrl.login())
        .wrap('/').load();
});


cyIt.run('Register Page -> Login Link -> When user clicks Login Link, then user is redirected to Login Page #priority-3-working #e2e-working', () => {
    cy.visit(customerUrl.register())
    cy.getEl(LOGIN_LINK).click().getLink().load();
});

cyIt.run('Register Page -> Anonymous Shopping Cart -> Given anonymous user has some items in shopping cart, when user registers, then anonymous cart items are added to the account user used to log in #priority-2-working #e2e-working', () => {
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

cyIt.run('Register Page -> Anonymous Wish List -> Given anonymous user has some items in wish list, when user registers, then anonymous wish list items are added to the account user used to log in #priority-2-working #e2e-working', () => {
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
