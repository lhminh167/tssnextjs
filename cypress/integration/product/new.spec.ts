import { getProduct } from "../../../modules/product/detail/product-detail.service";
import { apiProductUrl, productUrl } from "../../../modules/product/filter/product-filter.model";
import { HttpMethod } from "../../../modules/shared/crud/crud.model";
import { SUBMIT, YES } from "../../../modules/shared/tag/tag.model";
import { typeCreateProductForm } from "../../helpers/product/create/create-product.component.spec";
import { ProductDetailTest } from "../../helpers/product/detail/product-detail-card.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken } from "../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { mockRandomProduct } from "../../helpers/shared/helpers/product.helper";

cyIt.run('Add New Product Page -> Add New Product -> When user logged in as admin, then user could add a new product #e2e-working', () => {
  cy
    .server().route({ url: apiProductUrl.product, method: HttpMethod.POST }).as('route')
    .pipe(cySetAdminLoginToken)
    .visit(productUrl.new)
  cy.getEl(SUBMIT).click().takeScreenShot('Add New Product Page')
    .pipe(mockRandomProduct)
    .chain(typeCreateProductForm)
  cy.getEl(SUBMIT).click().wait('@route').its('responseBody.content').as('product');
  cy.getEl(YES).click();
  cy.get('@product').chain(productUrl.detail).its('as')
    .load();
  cy.get('@product').its('productId')
    .chain(getProduct).its('content')
    .chain(ProductDetailTest);
});

cyIt.run('Add New Product Page -> Access Denied -> When user logged in as customer, then user is redirected to Home Page #e2e-working', () => {
  cy
    .pipe(cySetCustomerLoginToken)
    .visit(productUrl.new)
    .wrap('/').load();
});

cyIt.run('Add New Product Page -> Access Denied -> When user is not logged in, then user is redirected to Home Page #e2e-working', () => {
  cy
    .visit(productUrl.new)
    .wrap('/').load();
});
