import { BACK } from "../../../../../modules/shared/tag/tag.model";

export function cyCompleteFinishForm() {
  cy.getEl(BACK).click().getLink().load()
  return cy;
}