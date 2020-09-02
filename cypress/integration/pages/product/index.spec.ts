import { IProductFilterFilter, productUrl, apiProductUrl, defaultProductFilterCategory, filterInitialData } from "../../../../modules/product/filter/product-filter.model";
import { getFilter } from "../../../../modules/product/filter/product-filter.service";
import { Response, HttpMethod } from "../../../../modules/shared/crud/crud.model";
import { defaultProduct, IProduct } from "../../../../modules/shared/models/product.model";
import { cyCreateProduct } from "../../../component/product/create/create-product.component.spec";
import { ProductFilterMetadataComponentTest } from "../../../component/product/filter/product-filter-metadata.component.spec";
import ProductFilterComponentTest from "../../../component/product/filter/product-filter.component.spec";
import { randomString, getRootAdminAccount } from "../../../support/commands";
import { cyLogin, cyLogout } from "../../../component/customer/login/login.component.spec";

describe('Product Search page', () => {






  before(() => {
    cy.visit(productUrl.product);
  });

  ProductFilterMetadataComponentTest();

  ProductFilterComponentTest();
});

export const cyWaitUntilDefaultOptions = { timeout: 600000, interval: 500 };