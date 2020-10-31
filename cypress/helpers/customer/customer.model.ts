import { Customer, ICreateCustomerRequest } from "../../../modules/customer/customer.model";
import { ROLE } from "../../../modules/shared/tag/tag.model";

export function chooseRole(role: string) {
    cy.getEl(ROLE).click();
    cy.getEl(ROLE + role).click();
    cy.getEl(ROLE).should('have.text', role);
}

export interface cyCustomer extends Customer, ICreateCustomerRequest {
    password?: string;
    newPassword?: string;
    confirmNewPassword?: string;
}
