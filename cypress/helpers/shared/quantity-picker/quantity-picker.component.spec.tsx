import { QUANTITY, PLUS_ONE_QUANTITY } from "../../../../modules/shared/tag/tag.model";

export function cyEditQuantity(input: number) {
  return cy
    .getEl(QUANTITY)
    .clear().should('have.value', 0)
    .type(input.toString()).should('have.value', input);
}
