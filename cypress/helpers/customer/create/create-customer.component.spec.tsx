import { ICreateCustomerRequest } from "../../../../modules/customer/customer.model";
import { CONFIRM_NEW_PASSWORD, EMAIL, NAME, PASSWORD } from "../../../../modules/shared/tag/tag.model";

export const registerTextFields = [NAME, EMAIL, PASSWORD, CONFIRM_NEW_PASSWORD];

export function typeRegister(user: ICreateCustomerRequest) {
    cy.fillTextFields(registerTextFields, user);
    return cy;
}