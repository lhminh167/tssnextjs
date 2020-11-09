import { customerUrl, defaultCustomer } from "../../modules/customer/customer.model";
import { getUserAvatar } from "../../modules/shared/helpers/string.helper";
import { decodeLoginToken } from "../../modules/shared/helpers/token.helper";
import { departmentUrl } from "../../modules/shared/models/department.model";
import { ADMIN, DEPARTMENT, EMAIL, HOMEPAGE, LINK, LOGIN, LOGOUT, MENU, NAME, ORDER, REGISTER, ROLE, SEARCH, SHOPPING_CART, tag, USER, WISHLIST } from "../../modules/shared/tag/tag.model";
import { cyGetExistingCustomer, cySetAdminLoginToken, cySetCustomerLoginToken } from "../helpers/shared/helpers/auth.helper";
import { cyItWithConfig } from "../helpers/shared/helpers/other.helper";
import { cyMobileWidth, cySnapshotMobileConfig } from "../helpers/shared/layout/layout.theme";
import { MobileAccountDetailTest } from "../helpers/shared/navbar/desktop-navbar.component.spec";


cyItWithConfig.run('Mobile Navbar -> Home Page Brand Link -> When user clicks Home Page Brand Link, then user is redirected to Home Page #e2e-working #visual-working', { viewportWidth: cyMobileWidth }, () => {
  cy.visit(departmentUrl);
  cy.getEl(HOMEPAGE).wait(4000).takeScreenShot('Mobile Navbar', cySnapshotMobileConfig);
  cy.getEl(HOMEPAGE).should('have.text', (Cypress.env('SITE_NAME') as string).toUpperCase())
    .click().getLink().load();
});

cyItWithConfig.run('Mobile Navbar -> Home Page Link -> When user clicks Home Page Link, then user is redirected to Home Page #e2e-working #visual-working', { viewportWidth: cyMobileWidth }, () => {
  cy.visit(departmentUrl);
  cy.getEl(MENU).click().wait(4000).takeScreenShot('Mobile Drawer for Visitors', cySnapshotMobileConfig);
  cy.getEl(HOMEPAGE + LINK).should('have.text', 'Home')
    .click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> Search Page Link -> When user clicks Search Page Link, then user is redirected to Search Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.visit(departmentUrl);
  cy.getEl(MENU).click();
  cy.getEl(SEARCH).should('have.text', 'Search')
    .click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> Deparments Link -> When user clicks Deparments Link, then user is redirected to Deparment List Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.visit(customerUrl.login());
  cy.getEl(MENU).click();
  cy.getEl(DEPARTMENT).wait(4000).should('have.text', 'Departments')
    .click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> Wish List Link -> When user clicks Wish List Link, then user is redirected to Wish List Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.visit(departmentUrl);
  cy.getEl(MENU).click();
  cy.getEl(WISHLIST).click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> Admin Area Link -> When user clicks Admin Area Link, then user is redirected to Admin Area Page #e2e-working #visual-working', { viewportWidth: cyMobileWidth }, () => {
  cy.pipe(cySetAdminLoginToken).visit(departmentUrl);
  cy.getEl(MENU).click();
  cy.getEl(ADMIN).wait(4000).takeScreenShot('Mobile Drawer for Customers & Admins', cySnapshotMobileConfig);
  cy.getEl(ADMIN).should('have.text', 'Admin')
    .click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> Order List Link -> When user clicks Order List Link, then user is redirected to Order List Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl);
  cy.getEl(MENU).click();
  cy.getEl(ORDER).should('have.text', 'Orders')
    .click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> Logout Link -> When user clicks Logout Link, then user is logged out and redirected to Home Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl);
  cy.getEl(MENU).click();
  cy.getEl(LOGOUT).click().wrap('/').load()
  // cy.getEl(USER).should('have.text', 'V');
  cy.getEl(LOGIN)
  cy.getEl(REGISTER)
  cy.shouldNotExist(tag(NAME, '', USER))
  cy.shouldNotExist(tag(EMAIL, '', USER))

});

cyItWithConfig.run('Mobile Navbar -> Login Page Link -> When user clicks Login Page Link, then user is redirected to Login Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.visit(departmentUrl);
  cy.getEl(MENU).click();
  cy.getEl(LOGIN).should('have.text', 'Login')
    .click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> Register Page Link -> When user clicks Register Page Link, then user is redirected to Register Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.visit(departmentUrl);
  cy.getEl(MENU).click();
  cy.getEl(REGISTER).should('have.text', 'Register')
    .click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> Shopping Cart Page Link -> When user clicks Shopping Cart Page Link, then user is redirected to Shopping Cart Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.visit(departmentUrl);
  cy.getEl(MENU).click();
  cy.getEl(SHOPPING_CART).click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});

cyItWithConfig.run('Mobile Navbar -> User Area Link -> When user clicks User Area Link, then user is redirected to User Area Page #e2e-working', { viewportWidth: cyMobileWidth }, () => {
  cy.pipe(cySetCustomerLoginToken).visit(departmentUrl)
  cy.getEl(MENU).click()
    .pipe(cyGetExistingCustomer).chain(MobileAccountDetailTest)
  cy.getEl(USER + LINK).click().getLink().load();
  cy.get('.MuiBackdrop-root').click({ force: true })
});
