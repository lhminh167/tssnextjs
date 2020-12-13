import { getProduct } from "../../../../../../modules/product/detail/product-detail.service";
import { apiProductUrl, productUrl } from "../../../../../../modules/product/filter/product-filter.model";
import { HttpMethod } from "../../../../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../../../../modules/shared/crud/crud.service";
import { SUBMIT, YES } from "../../../../../../modules/shared/tag/tag.model";
import { createProductTextFields, cyCreateProduct, cyCreateRandomProduct, cyGetExistingProduct, typeCreateProductForm } from "../../../../../helpers/product/create/create-product.component.spec";
import { ProductDetailTest } from "../../../../../helpers/product/detail/product-detail-card.component.spec";
import { cySetAdminLoginToken, cySetCustomerLoginToken } from "../../../../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../../../../helpers/shared/helpers/other.helper";
import { mockRandomProduct } from "../../../../../helpers/shared/helpers/product.helper";

// cyIt.run('Edit Product Page -> Edit Product Form -> Meta tags should have correct values', () => {
// });


cyIt.run('Edit Product Page -> Edit Product Form -> When user logged in as admin, then user can edit any product #priority-1-working #e2e-working #visual-working', () => {
   cy
      .pipe(cySetAdminLoginToken)
      .pipe(cyCreateRandomProduct).as('product')
      .chain(productUrl.edit).its('as')
      .pipe(cy.visit)

      .clearTextFields(createProductTextFields)
      .takeScreenShot('Edit Product Page')

      .pipe(mockRandomProduct)
      .chain(typeCreateProductForm);
   cy
      .getEl(SUBMIT).click()
   cy
      .getEl(YES).click()
      .get('@product').its('productId').chain(getProduct)
      .its('content').as('editedProduct')
      .chain(productUrl.detail).its('as').load()
      .get('@editedProduct').chain(ProductDetailTest);
});

cyIt.run('Edit Product Page -> Access Denied -> When user accesses Edit Product Page as customer, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
   const product = cyGetExistingProduct();
   cy
      .pipe(cySetCustomerLoginToken)
      .visit(productUrl.edit(product).as).wrap('/').load()
});


cyIt.run('Edit Product Page -> Access Denied -> When not-logged-in user accesses Edit Product Page, then user is redirected to Home Page #priority-4-working #e2e-working', () => {
   const product = cyGetExistingProduct();
   cy.visit(productUrl.edit(product).as).wrap('/').load();
});
