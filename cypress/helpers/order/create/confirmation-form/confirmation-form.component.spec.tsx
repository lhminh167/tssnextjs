import { GRAND_TOTAL, ORDER_SUMMARY, SUBMIT } from "../../../../../modules/shared/tag/tag.model";
import { cyFinishDeliveryForm, cyGoToDeliveryForm } from "../delivery-form/delivery-form.component.spec";

export function cyGoToConfirmationForm() {
    return cy
        .pipe(cyGoToDeliveryForm)
        .pipe(cyFinishDeliveryForm)
}

export function cyFinishConfirmationForm() {
    cy.getEl(SUBMIT).click().wait(5000);
    return cy;
}