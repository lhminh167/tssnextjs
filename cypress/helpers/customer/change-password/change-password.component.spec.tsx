import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD, PASSWORD } from "../../../../modules/shared/tag/tag.model";
import { cyCustomer } from "../customer.model";

export const changePasswordFields = [PASSWORD, NEW_PASSWORD, CONFIRM_NEW_PASSWORD];

export function typeChangePasswordForm(user: cyCustomer) {
    cy.fillTextFields(changePasswordFields, user);
    return cy;
}