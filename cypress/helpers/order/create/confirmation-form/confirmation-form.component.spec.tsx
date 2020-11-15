import { SUBMIT } from "../../../../../modules/shared/tag/tag.model";

export function cyFinishConfirmationForm() {
    cy.getEl(SUBMIT).click();
    return cy;
}