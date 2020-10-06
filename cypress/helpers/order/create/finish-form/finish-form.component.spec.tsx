import { ID, SUBMIT } from "../../../../../modules/shared/tag/tag.model";
import { getOrder } from "../../order.service";
import { cyFinishPaymentForm, cyGoToPaymentForm, getSuccessPaymentInfo, typePaymentForm } from "../payment-form/payment-form.component.spec";

export function cyGoToFinishForm() {
  return cy
    .pipe(cyGoToPaymentForm)
    .pipe(cyFinishPaymentForm)
}

export function cyCompleteFinishForm() {
  cy.getEl(SUBMIT).click().getLink().load();
}