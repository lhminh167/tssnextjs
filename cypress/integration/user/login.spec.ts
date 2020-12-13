import { customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer, login } from "../../../modules/customer/customer.service";
import { getValidLoginToken, removeLoginToken, setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { DESCRIPTION, FORGOT_PASSWORD, REGISTER_LINK, SUBMIT, YES } from "../../../modules/shared/tag/tag.model";
import { apiShoppingCartUrl, shoppingCartUrl } from "../../../modules/shopping-cart/shopping-cart.model";
import { addShoppingCartItem } from "../../../modules/shopping-cart/shopping-cart.service";
import { loginTextFields, typeLogin } from "../../helpers/customer/login/login.component.spec";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { cyGetCustomerLoginToken, cyGetExistingCustomer, cySetCustomerLoginToken, mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { UserPopoverDetailTest } from "../../helpers/shared/navbar/desktop-navbar.component.spec";
import { ShoppingCartItemDetailTest } from "../../helpers/shopping-cart/detail/shopping-cart-item.component.spec";
import { fromProductToCartItem } from "../../helpers/shopping-cart/detail/shopping-cart.component.spec";

cyIt.run('Login Page -> Login -> When not-logged-in user accesses Login Page, then user can log in #priority-1-working #e2e-working #visual-working', () => {
    const user = cyGetExistingCustomer();
    cy
        .visit(customerUrl.login())
    cy
        .clearTextFields(loginTextFields).takeScreenShot('Login Page')
        .wrap(user).pipe(typeLogin)
    cy
        .getEl(SUBMIT).click()
        .wrap('/').load()
        .wrap(user).chain(UserPopoverDetailTest).wait(4000).takeScreenShot('User Detail Popover')
});

cyIt.run('Login Page -> Incorrect email or password -> When not-logged-in user enters incorrect email address or password, then an error message is showm #priority-2-working #e2e-working', () => {
    const user = cyGetExistingCustomer();
    const anotherUser = mockRandomCustomer();

    cy.visit(customerUrl.login())

    cy.wrap({ ...user, email: anotherUser.email }).pipe(typeLogin)
    cy.getEl(SUBMIT).click()
    cy.getEl(DESCRIPTION).should('have.text', 'Incorrect email or password. Please try again.')
    cy.getEl(YES).click()

    cy.wrap({ ...user, password: anotherUser.password }).pipe(typeLogin)
    cy.getEl(SUBMIT).click()
    cy.getEl(DESCRIPTION).should('have.text', 'Incorrect email or password. Please try again.')
});

cyIt.run('Login Page -> Access Denied -> When logged-in user accesses Login Page, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
    cy
        .pipe(cySetCustomerLoginToken)
        .visit(customerUrl.login())
        .wrap('/').load();
});

cyIt.run('Login Page -> Register Link -> When user clicks Register Link, then user is redirected to Register Page #priority-3-working #e2e-working', () => {
    cy.visit(customerUrl.login())
    cy.getEl(REGISTER_LINK).click().getLink().load();
});


cyIt.run('Login Page -> Forgot Password Link -> When user clicks Forgot Password Link, then user is redirected to Forgot Password Page #priority-3-working #e2e-working', () => {
    cy.visit(customerUrl.login())
    cy.getEl(FORGOT_PASSWORD).click().getLink().load();
});


cyIt.run('Login Page -> Anonymous Shopping Cart -> Given anonymous user has some items in shopping cart, when user logs in, then anonymous cart items are added to the account user used to log in #priority-2-working #e2e-working', () => {
    const item = fromProductToCartItem(cyGetExistingProduct(), 2, true);
    cy
        .pipe(mockRandomCustomer).as('customer')
        .pipe(createCustomer).its('content')

        .wrap(item).pipe(addShoppingCartItem)
        .its('content.loginToken').chain(setLoginToken)

        .get('@customer').chain(login)
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


cyIt.run('Login Page -> Anonymous Shopping Cart -> Given an anonymous user has a cart item and a customer has the same cart item, when user logs in as that customer, then anonymous cart item is removed and its quantity is added up to the customer/s same item #priority-2-working #e2e-working', () => {
    const item = fromProductToCartItem(cyGetExistingProduct(), 2, true);
    cy
        .pipe(mockRandomCustomer).as('customer')
        .pipe(createCustomer)
        .its('content.loginToken').chain(setLoginToken)
        .wrap(item).pipe(addShoppingCartItem).chain(removeLoginToken)

        .wrap(item).pipe(addShoppingCartItem)
        .its('content.loginToken').chain(setLoginToken)

        .get('@customer').chain(login)
        .its('content.loginToken').chain(setLoginToken)

        .server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
        .visit(shoppingCartUrl.baseUrl)

        .wait('@route').its('responseBody.content.items')
        .pipe(res => ({
            ...item,
            itemId: res[0].itemId,
            quantity: 4,
        }))
        .chain(ShoppingCartItemDetailTest);
});


cyIt.run('Login Page -> Anonymous Wish List -> Given anonymous user has some items in wish list, when user logs in, then anonymous wish list items are added to the account user used to log in #priority-2-working #e2e-working', () => {
    const item = fromProductToCartItem(cyGetExistingProduct(), 2, false);
    cy
        .pipe(mockRandomCustomer).as('customer')
        .pipe(createCustomer).its('content')

        .wrap(item).pipe(addShoppingCartItem)
        .its('content.loginToken').chain(setLoginToken)

        .get('@customer').chain(login)
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


cyIt.run('Login Page -> Anonymous wish List -> Given an anonymous user has a wish list item and a customer has the same wish list item, when user logs in as that customer, then anonymous wish list item is removed and its quantity is added up to the customer/s same item #priority-2-working #e2e-working', () => {
    const item = fromProductToCartItem(cyGetExistingProduct(), 2, false);
    cy
        .pipe(mockRandomCustomer).as('customer')
        .pipe(createCustomer)
        .its('content.loginToken').chain(setLoginToken)
        .wrap(item).pipe(addShoppingCartItem).chain(removeLoginToken)

        .wrap(item).pipe(addShoppingCartItem)
        .its('content.loginToken').chain(setLoginToken)

        .get('@customer').chain(login)
        .its('content.loginToken').chain(setLoginToken)

        .server().route(apiShoppingCartUrl.baseUrl + '?**').as('route')
        .visit(shoppingCartUrl.wishList)

        .wait('@route').its('responseBody.content.items')
        .pipe(res => ({
            ...item,
            itemId: res[0].itemId,
            quantity: 4,
        }))
        .chain(ShoppingCartItemDetailTest);
});
