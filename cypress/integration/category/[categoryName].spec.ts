import { getCategory } from "../../../modules/category/category.service";
import { categoryUrl } from "../../../modules/shared/models/category.model";
import { CATEGORY, GALLERY, RECOMMENDATION } from "../../../modules/shared/tag/tag.model";
import { CategoryDetailTest } from "../../helpers/category/detail/category-detail.component.spec";
import { cyVisitExistingProduct, cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import { ProductDetailTest } from "../../helpers/product/detail/product-detail-card.component.spec";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { ProductLinkTest } from "../../helpers/shared/product-card/product-card.component.spec";
import ProductListTest from "../../helpers/shared/product-list/product-list.component.spec";

cyIt.run('Category Detail Page -> Category Details -> When page finished loading, product details should have correct values #priority-1-working #e2e-working #visual-working', () => {
  cy.wrap(1).pipe(getCategory).its('content').as('category')
    .pipe(categoryUrl.detail).its('as')
    .pipe(cy.visit);
  cy.getEl(GALLERY).takeScreenShot('Category Detail Page');
  cy.getEl(CATEGORY).within(() => {
    cy.get('@category').chain(CategoryDetailTest);
  })
});

cyIt.run('Category Detail Page -> Product Recommendations -> When page finished loading, product recommendations should have correct values #priority-2-working #e2e-working', () => {
  cy
    .wrap(1).pipe(getCategory).its('content').as('category')
    .pipe(categoryUrl.detail).its('as')
    .pipe(cy.visit);
  cy
    .getEl(GALLERY).should('exist').within(() =>
      cy
        .get('@category').its('product.items')
        .pipe(items => items.slice(0, 4))
        .chain(ProductListTest).chain(ProductLinkTest)
    )
});
