import { ICreateCustomerRequest } from "../../../../modules/customer/customer.model";
import { EMAIL, NAME, PASSWORD } from "../../../../modules/shared/tag/tag.model";

export const registerTextFields = [NAME, EMAIL, PASSWORD];

export function typeRegister(user: ICreateCustomerRequest) {
    cy.fillTextFields(registerTextFields, user);
}