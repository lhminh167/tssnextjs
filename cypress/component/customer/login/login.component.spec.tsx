import { SUBMIT, LOGOUT } from "../../../../modules/shared/tag/tag.model";
import { ILoginRequest, customerUrl, LoginRequestValidator, ILoginResponse } from "../../../../modules/customer/customer.model";
import { cyRegister, generateRandomAccount } from "../create/create-customer.component.spec";
import { cyDispatch } from "../../root/root.store";
import { currentUserSlice } from "../../../../modules/customer/customer.slice";
import { login } from "../../../../modules/customer/customer.service";
import { Response } from "../../../../modules/shared/crud/crud.model";
import { setLoginToken, removeLoginToken } from "../../../../modules/shared/helpers/token.helper";

export default function LoginComponentTest() {
    describe('LoginComponentTest', () => {
        it('should log user in successfully', () => {
            const user = generateRandomAccount();
            cyRegister(user);
            cy.getEl(LOGOUT).click();
            cy.load('/');

            cy.visit(customerUrl.login);
            cy.typeLogin(user);
            cy.getEl(SUBMIT).click();
            cy.load('/');
        })
    })
}

export function cyLogin(user: ILoginRequest): Promise<Response<ILoginResponse>> {
    return new Promise((resolve, reject) => {
        login(user).then((response: Response<ILoginResponse>) => {
            expect(response.status, 'Login api response status code:').to.eq(200);
            setLoginToken(response.content.loginToken);
            resolve(response);
        })
    })
}

export function cyLogout() {
    return new Promise((resolve, reject) => {
        removeLoginToken();
        resolve()
    })
}
