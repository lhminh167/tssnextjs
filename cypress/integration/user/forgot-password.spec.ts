import { apiCustomerUrl, customerUrl } from "../../../modules/customer/customer.model";
import { createCustomer } from "../../../modules/customer/customer.service";
import { HttpMethod } from "../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../modules/shared/crud/crud.service";
import { toNumber } from "../../../modules/shared/helpers/auth.helper";
import { removeLoginToken, setLoginToken } from "../../../modules/shared/helpers/token.helper";
import { DESCRIPTION, EMAIL, HOMEPAGE, SUBMIT } from "../../../modules/shared/tag/tag.model";
import { getResetPasswordToken } from "../../helpers/customer/customer.service";
import { typeLogin } from "../../helpers/customer/login/login.component.spec";
import { resetPasswordFields, resetPasswordTest } from "../../helpers/customer/reset-password/reset-password.component.spec";
import { mockRandomCustomer } from "../../helpers/shared/helpers/auth.helper";
import { UserPopoverDetailTest } from "../../helpers/shared/navbar/desktop-navbar.component.spec";

it('Forgot Password Page -> Forgot Password -> When user resets their forgotten password, then user can log in using new password #e2e-working #visual-working', () => {
    const user = mockRandomCustomer();
    cy
        .server().route({ url: getUrl(apiCustomerUrl.forgotPassword), method: HttpMethod.PUT }).as('route')
        .wrap(user).pipe(createCustomer).its('content').as('response')
        .its('customer.customerId').then((customerId: any) => user.customerId = customerId)
        .visit(customerUrl.forgotPassword)
    cy
        .clearTextFields([EMAIL]).takeScreenShot('Forgot Password Page')
        .fillTextFields([EMAIL], user)
    cy
        .getEl(SUBMIT).click().wait('@route')
    cy
        .getEl(DESCRIPTION).should('have.text', 'Your request was successfully processed. Please check your email inbox for reset password link.')
        .get('@response').its('loginToken').chain(setLoginToken)
        .then(() => getResetPasswordToken(toNumber(user.customerId)))
        .its('content.resetPasswordToken')
        .then(token => resetPasswordTest(user, token))
});
