import { decodeLoginToken } from "../../modules/shared/helpers/token.helper";
import { departmentUrl } from "../../modules/shared/models/department.model";
import { ADMIN, DEPARTMENT, EMAIL, HOMEPAGE, LINK, LOGIN, LOGOUT, NAME, ORDER, REGISTER, ROLE, SEARCH, SHOPPING_CART, tag, USER, WISHLIST } from "../../modules/shared/tag/tag.model";
import cyGetSiteName from "../helpers/shared/brand/brand.component.spec";
import { cyGetExistingCustomer, cySetAdminLoginToken, cySetCustomerLoginToken } from "../helpers/shared/helpers/auth.helper";
import { cyIt } from "../helpers/shared/helpers/other.helper";
import { UserPopoverDetailTest } from "../helpers/shared/navbar/desktop-navbar.component.spec";

cyIt.run('Desktop Navbar -> Home Page Link -> When user clicks Home Page Link, then user is redirected to Home Page #priority-3-working #e2e-working', () => {
  cy.visit(departmentUrl).wait(4000);
  cy.getEl(HOMEPAGE).should('have.text', cyGetSiteName())
    .click().getLink().load();
});

cyIt.run('Desktop Navbar -> Search Page Link -> When user clicks Search Page Link, then user is redirected to Search Page #priority-3-working #e2e-working', () => {
  cy.visit(departmentUrl);
  cy.getEl(SEARCH).should('have.text', 'Search')
    .click().getLink().load();
});

cyIt.run('Desktop Navbar -> Deparments Link -> When user clicks Deparments Link, then user is redirected to Deparment List Page #priority-3-working #e2e-working', () => {
  cy.visit(departmentUrl);
  cy.getEl(DEPARTMENT).should('have.text', 'Departments')
    .click().getLink().load();
});

cyIt.run('Desktop Navbar -> Wish List Link -> When user clicks Wish List Link, then user is redirected to Wish List Page #priority-3-working #e2e-working', () => {
  cy.visit(departmentUrl);
  cy.getEl(WISHLIST).click().getLink().load();
});

cyIt.run('Desktop Navbar -> Admin Area Link -> When user clicks Admin Area Link, then user is redirected to Admin Area Page #priority-3-working #e2e-working', () => {
  cy.pipe(cySetAdminLoginToken).visit(departmentUrl);
  cy.getEl(ADMIN).should('have.text', 'Admin')
    .click().getLink().load();
});

cyIt.run('Desktop Navbar -> Order List Link -> When user clicks Order List Link, then user is redirected to Order List Page #priority-3-working #e2e-working', () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl);
  cy.getEl(ORDER).should('have.text', 'Orders')
    .click().getLink().load();
});

cyIt.run('Desktop Navbar -> Logout Link -> When user clicks Logout Link, then user is logged out and redirected to Home Page #priority-4-working #e2e-working', () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl);
  cy.getEl(LOGOUT).click().wrap('/').load()
  cy.shouldNotExist(USER + LINK);
  cy.getEl(LOGIN)
  cy.getEl(REGISTER)
});

cyIt.run('Desktop Navbar -> Login Page Link -> When user clicks Login Page Link, then user is redirected to Login Page #priority-3-working #e2e-working', () => {
  cy.visit(departmentUrl);
  cy.getEl(LOGIN).should('have.text', 'Login')
    .click().getLink().load();
});

cyIt.run('Desktop Navbar -> Register Page Link -> When user clicks Register Page Link, then user is redirected to Register Page #priority-3-working #e2e-working', () => {
  cy.visit(departmentUrl);
  cy.getEl(REGISTER).should('have.text', 'Register')
    .click().getLink().load();
});

cyIt.run('Desktop Navbar -> Shopping Cart Page Link -> When user clicks Shopping Cart Page Link, then user is redirected to Shopping Cart Page #priority-3-working #e2e-working', () => {
  cy.visit(departmentUrl);
  cy.getEl(SHOPPING_CART).click().getLink().load();
});

cyIt.run('Desktop Navbar -> User Area Link -> When user clicks User Area Link, then user is redirected to User Area Page #priority-3-working #e2e-working', () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl)
    .pipe(cyGetExistingCustomer).chain(UserPopoverDetailTest);
  cy.getEl(USER + LINK).click().getLink().load();
});
