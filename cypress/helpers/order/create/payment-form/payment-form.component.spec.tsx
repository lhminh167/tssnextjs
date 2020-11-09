import { SUBMIT, ORDER_SUMMARY, GRAND_TOTAL, ID } from "../../../../../modules/shared/tag/tag.model";
import { cyFinishConfirmationForm, cyGoToConfirmationForm } from "../confirmation-form/confirmation-form.component.spec";

export function typePaymentForm(input: IPaymentInfo) {
  cy.wait(5000).get(".__PrivateStripeElement > iframe").then(($element) => {
    const $body = $element.contents().find("body");

    typePaymentField($body, 'cardnumber', input.cardNumber);
    typePaymentField($body, 'exp-date', input.expDate);
    typePaymentField($body, 'cvc', input.cvc);
    typePaymentField($body, 'postal', input.postal);
  });

  return cy;
}

function typePaymentField($body: any, field: string, value: string) {
  cy
    .wrap($body).find(`[name="${field}"]`).should('exist')
    .click().clear().should('have.value', '')
    .type(value)
}

export function getChallengeFrame() {
  return cy
    .get('[src*="https://js.stripe.com/v3/three-ds-2-challenge"]')
    .pipe(getIframeBody)
    .find('.ThreeDS2-container > iframe')
    .pipe(getIframeBody)
}

export function getIframeBody(input) {
  return cy.wrap(input.contents().find("body"));
}

export interface IPaymentInfo {
  cardNumber: string;
  expDate: string;
  cvc: string;
  postal: string;
}

export function getSuccessPaymentInfo() {
  const res: IPaymentInfo = {
    cardNumber: '4242424242424242',
    expDate: '1232',
    cvc: '987',
    postal: '12345'
  }
  return res;
}

export function get3DSecurePaymentInfo() {
  const res: IPaymentInfo = {
    cardNumber: '4000000000003220',
    expDate: '1232',
    cvc: '987',
    postal: '12345'
  }
  return res;
}

export function getInsufficientFundsPaymentInfo() {
  const res: IPaymentInfo = {
    cardNumber: '4000000000009995',
    expDate: '1232',
    cvc: '987',
    postal: '12345'
  }
  return res;
}

export function cyGoToPaymentForm() {
  return cy
    .pipe(cyGoToConfirmationForm)
    .pipe(cyFinishConfirmationForm);
}
