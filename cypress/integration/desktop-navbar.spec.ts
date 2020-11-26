import { customerUrl } from "../../modules/customer/customer.model";
import { orderUrl } from "../../modules/order/order.model";
import { productUrl } from "../../modules/product/filter/product-filter.model";
import { decodeLoginToken } from "../../modules/shared/helpers/token.helper";
import { departmentUrl } from "../../modules/shared/models/department.model";
import { ADMIN, DEPARTMENT, EMAIL, HOMEPAGE, LINK, LOGIN, LOGOUT, NAME, ORDER, REGISTER, ROLE, SEARCH, SHOPPING_CART, tag, USER, WISHLIST } from "../../modules/shared/tag/tag.model";
import { shoppingCartUrl } from "../../modules/shopping-cart/shopping-cart.model";
import cyGetSiteName from "../helpers/shared/brand/brand.component.spec";
import { cyGetExistingCustomer, cySetAdminLoginToken, cySetCustomerLoginToken } from "../helpers/shared/helpers/auth.helper";
import { cyIt } from "../helpers/shared/helpers/other.helper";
import { UserPopoverDetailTest } from "../helpers/shared/navbar/desktop-navbar.component.spec";

cyIt.run('Desktop Navbar -> Links for Visitors and Anonymous Users #e2e-working', () => {
  cy.visit(departmentUrl).wait(4000);
  cy.getEl(HOMEPAGE).should('have.text', cyGetSiteName()).getLink().should('have.value', '/')
  cy.getEl(SEARCH).should('have.text', 'Search').getLink().should('have.value', productUrl.product)
  cy.getEl(DEPARTMENT).should('have.text', 'Departments').getLink().should('have.value', departmentUrl)
  cy.getEl(WISHLIST).should('have.text', 'Wishlist').getLink().should('have.value', shoppingCartUrl.wishList)
  cy.getEl(LOGIN).should('have.text', 'Login').getLink().should('have.value', customerUrl.login)
  cy.getEl(REGISTER).should('have.text', 'Register').getLink().should('have.value', customerUrl.register)
  cy.getEl(SHOPPING_CART).getLink().should('have.value', shoppingCartUrl.baseUrl)
});

cyIt.run('Desktop Navbar -> Links for Admins #e2e-working', () => {
  cy.pipe(cySetAdminLoginToken).visit(departmentUrl);
  cy.getEl(ADMIN).should('have.text', 'Admin').getLink().should('have.value', '/admin')
});

cyIt.run('Desktop Navbar -> Links for Customers #e2e-working', () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl).wait(4000);
  cy.getEl(HOMEPAGE).should('have.text', cyGetSiteName()).getLink().should('have.value', '/')
  cy.getEl(SEARCH).should('have.text', 'Search').getLink().should('have.value', productUrl.product)
  cy.getEl(DEPARTMENT).should('have.text', 'Departments').getLink().should('have.value', departmentUrl)
  cy.getEl(WISHLIST).should('have.text', 'Wishlist').getLink().should('have.value', shoppingCartUrl.wishList)
  cy.getEl(ORDER).should('have.text', 'Orders').getLink().should('have.value', orderUrl.baseUrl)
  cy.getEl(LOGOUT).should('have.text', 'Logout')
  cy.shouldNotExist(LOGIN)
  cy.shouldNotExist(REGISTER)
  cy.getEl(SHOPPING_CART).getLink().should('have.value', shoppingCartUrl.baseUrl)
  cy.getEl(USER + LINK).getLink().should('have.value', customerUrl.baseUrl)
});

cyIt.run('Desktop Navbar -> Logout Link -> When user clicks Logout Link, then user is logged out and redirected to Home Page #e2e-working', () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl);
  cy.getEl(LOGOUT).click().wrap('/').load()
  cy.shouldNotExist(USER + LINK);
  cy.getEl(LOGIN)
  cy.getEl(REGISTER)
});

cyIt.run('Desktop Navbar -> User Area Link -> When user clicks User Area Link, then user is redirected to User Area Page #e2e-working', () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl)
    .pipe(cyGetExistingCustomer).chain(UserPopoverDetailTest);
  cy.getEl(USER + LINK).click().getLink().load();
});
