import { apiCustomerUrl, customerUrl } from "../../../../../modules/customer/customer.model";
import { createCustomer, forgotPassword, resetPassword } from "../../../../../modules/customer/customer.service";
import { HttpMethod } from "../../../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../../../modules/shared/crud/crud.service";
import { toNumber } from "../../../../../modules/shared/helpers/auth.helper";
import { removeLoginToken, setLoginToken } from "../../../../../modules/shared/helpers/token.helper";
import { CONFIRM_NEW_PASSWORD, DESCRIPTION, NEW_PASSWORD, SUBMIT } from "../../../../../modules/shared/tag/tag.model";
import { getResetPasswordToken } from "../../../../helpers/customer/customer.service";
import { resetPasswordFields, resetPasswordTest } from "../../../../helpers/customer/reset-password/reset-password.component.spec";
import { mockRandomCustomer } from "../../../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../../../helpers/shared/helpers/other.helper";
import { getRandomString } from "../../../../helpers/shared/helpers/string.helper";

cyIt.run('Reset Password Page -> Invalid Reset Password Token -> When user access this page using an expired or invalid reset password token, then an error message is shown to user #e2e-working #visual-working', () => {
    const user = mockRandomCustomer();
    cy
        .wrap(user).pipe(createCustomer).its('content').as('response')
        .its('customer.customerId').then((customerId: any) => user.customerId = customerId)
        .wrap(user).chain(forgotPassword)

        .get('@response').its('loginToken').chain(setLoginToken)
        .then(() => getResetPasswordToken(toNumber(user.customerId)))
        .its('content.resetPasswordToken')
        .then(token => {
            const customerId = toNumber(user.customerId);
            cy.wrap({ ...user, resetPasswordToken: token }).chain(resetPassword)
            cy
                .chain(removeLoginToken)
                .visit(customerUrl.resetPassword(customerId, token))
            cy
                .getEl(DESCRIPTION).should('have.text', 'This password reset link is invalid or has expired.')
                .takeScreenShot('Invalid Reset Password Token Page & Notifier')
        })
});
