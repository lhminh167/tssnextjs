import NavbarComponentTest from "../../component/shared/navbar/navbar.component.spec";
import { ShoppingCartMetadataComponentTest } from "../../component/shopping-cart/detail/shopping-cart-metadata.component.spec";
import ShoppingCartComponentTest from "../../component/shopping-cart/detail/shopping-cart.component.spec";
import { shoppingCartUrl } from "../../component/shopping-cart/shopping-cart.model";

describe('Shopping Cart page', () => {

  beforeEach(() => {
    cy.visit(shoppingCartUrl.baseUrl);
  });

  ShoppingCartComponentTest();
  ShoppingCartMetadataComponentTest();
  NavbarComponentTest();
});