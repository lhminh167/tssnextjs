import { apiCustomerUrl, customerUrl } from "../../../../modules/customer/customer.model";
import { HttpMethod } from "../../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../../modules/shared/crud/crud.service";
import { toNumber } from "../../../../modules/shared/helpers/auth.helper";
import { removeLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { NEW_PASSWORD, CONFIRM_NEW_PASSWORD, SUBMIT, DESCRIPTION, HOMEPAGE } from "../../../../modules/shared/tag/tag.model";
import { UserPopoverDetailTest } from "../../shared/navbar/desktop-navbar.component.spec";
import { cyCustomer } from "../customer.model";
import { typeLogin } from "../login/login.component.spec";

export const resetPasswordFields = [NEW_PASSWORD, CONFIRM_NEW_PASSWORD];

export function resetPasswordTest(user: cyCustomer, resetPasswordToken: string) {
    const customerId = toNumber(user.customerId);
    cy
        .route({ url: getUrl(apiCustomerUrl.resetPassword(customerId, resetPasswordToken)), method: HttpMethod.PUT })
        .as('resetPasswordRoute')
        .chain(removeLoginToken)
        .visit(customerUrl.resetPassword(customerId, resetPasswordToken))
    cy
        .getEl(HOMEPAGE).takeScreenShot()
        .fillTextFields(resetPasswordFields, user)
    cy
        .getEl(SUBMIT).click()
        .wait('@resetPasswordRoute')
    cy
        .getEl(DESCRIPTION).should('have.text', 'Password was reset successfully. A confirmation email was sent to your email address.')
    cy
        .getEl(SUBMIT).click().wrap(customerUrl.login()).load()
        .wrap({ ...user, password: user.newPassword }).pipe(typeLogin)
    cy
        .getEl(SUBMIT).click()
        .wrap('/').load()
        .wrap(user).chain(UserPopoverDetailTest)
}