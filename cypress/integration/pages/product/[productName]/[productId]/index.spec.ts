import 'cypress-wait-until';
import { getProduct } from "../../../../../../modules/product/detail/product-detail.service";
import { productUrl } from "../../../../../../modules/product/filter/product-filter.model";
import { Response } from "../../../../../../modules/shared/crud/crud.model";
import { IProduct } from "../../../../../../modules/shared/models/product.model";
import { itShouldLoadMetaTags } from "../../../../../support/metadata";
import { SHOPPING_CART } from '../../../../../../modules/shared/navbar/navbar.tag';
import { testProductDetailCard, testNavBar } from '../../../../../component/admin.spec';

describe('Product detail page', () => {

  beforeEach(() => {
    cy.waitUntil(() => getProduct(1).then((res: Response<IProduct>) => {
      cy.visit(productUrl.detail(res.content).as).location().its('pathname').load();
      return res.status === 200;
    }), { timeout: 600000, interval: 500 });
  });

  // describe('should load basic component', () => {
  itShouldLoadMetaTags();
  // });

  testNavBar();


  // it('should load ', () => {
  //   // cy.get('[data-cy=top-panel]').should('have.length', 1);
  // });

  testProductDetailCard();

});