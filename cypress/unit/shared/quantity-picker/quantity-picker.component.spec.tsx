import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { ADJUST_QUANTITY, PLUS_ONE_QUANTITY } from "../../../../modules/shared/tag/tag.model";

export default function QuantityPickerComponentTest() {
  describe('Quantity picker component', () => {

    it('should adjust quantity correctly', () => {
      cy.getEl(ADJUST_QUANTITY).invoke('attr', 'value').then(prevQuantity => {
        cy.getEl(PLUS_ONE_QUANTITY).click();
        cy.getEl(ADJUST_QUANTITY).invoke('attr', 'value').should('eq', (toNumber(prevQuantity) + 1).toString());
      });

    });


  });
}
