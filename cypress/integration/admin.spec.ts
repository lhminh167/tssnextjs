import { ADD_NEW_PRODUCT } from "../../modules/shared/tag/tag.model";
import { cySetAdminLoginToken } from "../helpers/shared/helpers/auth.helper";
import { cyIt } from "../helpers/shared/helpers/other.helper";

cyIt.run('Admin Area Page -> Access Denied -> When user is not logged in as admin and accesses Admin Area Page, then user is redirected to homepage #priority-3-working #e2e-working', () => {
  cy.visit('/admin').wrap('/').load();
});

cyIt.run('Admin Area Page -> Add New Product Link -> When user clicks Add New Product Link, then user is redirected to Add New Product Page #priority-1-working #e2e-working #visual-working', () => {
  cy.pipe(cySetAdminLoginToken).visit('/admin');
  cy.getEl(ADD_NEW_PRODUCT).takeScreenShot('Admin Area Page');
  cy.getEl(ADD_NEW_PRODUCT).click().getLink().load();
})