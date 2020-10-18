import { BACK, ID, SUBMIT } from "../../../../../modules/shared/tag/tag.model";
import { getOrder } from "../../order.service";
import { cyFinishPaymentForm, cyGoToPaymentForm, getSuccessPaymentInfo, typePaymentForm } from "../payment-form/payment-form.component.spec";

export function cyCompleteFinishForm() {
  cy.getEl(BACK).click().getLink().load()
  return cy;
}