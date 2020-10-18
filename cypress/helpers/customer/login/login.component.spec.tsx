import { ILoginRequest } from "../../../../modules/customer/customer.model";
import { login } from "../../../../modules/customer/customer.service";
import { removeLoginToken, setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { EMAIL, PASSWORD } from "../../../../modules/shared/tag/tag.model";

export async function cyLogin(user: ILoginRequest) {
    cy
        .wrap(login(user)).should('have.property', status, 200)
        .wrap(res => setLoginToken(res.content.loginToken))
}

export function cyLogout() {
    cy.wrap(removeLoginToken);
}

export function typeLogin(user) {
    cy.getEl(EMAIL).type(user.email);
    cy.getEl(PASSWORD).type(user.password);
    return cy;
}