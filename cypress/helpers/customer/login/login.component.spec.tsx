import { ILoginRequest } from "../../../../modules/customer/customer.model";
import { login } from "../../../../modules/customer/customer.service";
import { removeLoginToken, setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { EMAIL, PASSWORD } from "../../../../modules/shared/tag/tag.model";

export const loginTextFields = [EMAIL, PASSWORD];

export function typeLogin(user: ILoginRequest) {
    cy.fillTextFields(loginTextFields, user);
    return cy;
}