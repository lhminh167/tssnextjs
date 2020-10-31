import { ICreateCustomerRequest } from "../../../../modules/customer/customer.model";
import { EMAIL, NAME, PASSWORD } from "../../../../modules/shared/tag/tag.model";

export function typeRegister(user: ICreateCustomerRequest) {
    cy.fillTextFields([NAME, EMAIL, PASSWORD], user);
}