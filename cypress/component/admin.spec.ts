import { SHOPPING_CART } from "../../modules/shared/navbar/navbar.tag";
import { MINUS_ONE_QUANTITY, ADJUST_QUANTITY, PLUS_ONE_QUANTITY } from "../../modules/shared/quantity-picker/quantity-picker.tag";
import { toNumber } from "../../modules/shared/helpers/auth.helper";

export function testTopPanel() {
  describe('Top panel tests', () => {



    // it('should go to product detail page when a product card was clicked', () => {
    //   cy.get('[data-cy=top-panel]').should('have.length', 1);
    // });

  });
}

export function testProductDetailCard() {
  describe('Product detail card tests', () => {


    testQuantityPicker();
  });
}



export function testQuantityPicker() {
  describe('Quantity picker tests', () => {

    it('quanty to shopping cart page when shopping cart icon was clicked', () => {
      cy.getEl(ADJUST_QUANTITY).invoke('attr', 'value').then(prevQuantity => {
        cy.getEl(PLUS_ONE_QUANTITY).click();
        cy.getEl(ADJUST_QUANTITY).invoke('attr', 'value').should('eq', toNumber(prevQuantity) + 1);
        cy.get('@todos')
      });

    });


  });
}

export function testNavBar() {
  describe('Navbar tests', () => {

    it('should go to shopping cart page when shopping cart icon was clicked', () => {
      cy.getEl(SHOPPING_CART).click().getLink().load();
    });


  });
}