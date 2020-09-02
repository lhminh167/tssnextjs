import { CreateCustomerMetadataComponentTest } from "../../../component/customer/create/create-customer-metadata.component.spec";
import CreateProductComponentTest from "../../../component/product/create/create-product.component.spec";
import { loginTokenKey, customerUrl } from "../../../../modules/customer/customer.model";
import { cyLogin } from "../../../component/customer/login/login.component.spec";
import { getRootAdminAccount } from "../../../support/commands";
import { productUrl } from "../../../../modules/product/filter/product-filter.model";

describe('Add New Product page', () => {

  before(() => {
    cy.visit(customerUrl.login);
    cy.clearLocalStorage(loginTokenKey);
    cyLogin(getRootAdminAccount());
    cy.visit(productUrl.new);
    cy.load(productUrl.new);

  });

  CreateCustomerMetadataComponentTest();

  CreateProductComponentTest();
});