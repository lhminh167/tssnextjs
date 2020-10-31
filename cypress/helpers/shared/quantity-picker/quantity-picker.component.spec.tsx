import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { QUANTITY, PLUS_ONE_QUANTITY } from "../../../../modules/shared/tag/tag.model";

export default function QuantityPickerComponentTest() {
  describe('Quantity picker component', () => {

    it('should adjust quantity correctly', () => {
      cy.getEl(QUANTITY).invoke('attr', 'value').then(prevQuantity => {
        cy.getEl(PLUS_ONE_QUANTITY).click();
        cy.getEl(QUANTITY).invoke('attr', 'value').should('eq', (toNumber(prevQuantity) + 1).toString());
      });

    });


  });
}


export function cyEditQuantity(input: number) {
  return cy
    .getEl(QUANTITY)
    .clear().should('have.value', 0)
    .type(input.toString()).should('have.value', input);
}
