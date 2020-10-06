import { customerUrl, ILoginRequest } from "../../../../modules/customer/customer.model";
import { login } from "../../../../modules/customer/customer.service";
import { removeLoginToken, setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { EMAIL, PASSWORD, SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { mockRandomAccount } from "../../shared/helpers/auth.helper";
import { cyRegister } from "../create/create-customer.component.spec";

export default function LoginComponentTest() {
    describe('LoginComponentTest', () => {

        beforeEach(() => {
            cy
                .pipe(mockRandomAccount)
                .get('@user').chain(cyRegister)
                .wrap(cyLogout());
        });

        it('should log user in successfully', () => {
            cy
                .visit(customerUrl.login())
                .get('@user').chain(typeLogin)
                .getEl(SUBMIT).click().wrap('/').load();
        })
    })
}

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