import { ADD_NEW_PRODUCT } from "../../modules/shared/tag/tag.model";
import { cySetAdminLoginToken } from "../helpers/shared/helpers/auth.helper";

it('Admin Area Page -> Access Denied -> When user is not logged in as admin and accesses Admin Area Page, then user is redirected to homepage #working', () => {
  cy.visit('/admin').wrap('/').load();
});

it('Admin Area Page -> Add New Product Link -> When user clicks Add New Product Link, then user is redirected to Add New Product Page #working', () => {
  cy.pipe(cySetAdminLoginToken).visit('/admin');
  cy.getEl(ADD_NEW_PRODUCT).click().getLink().load();
})