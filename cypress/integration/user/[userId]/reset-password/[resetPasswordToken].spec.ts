import { customerUrl } from "../../../../../modules/customer/customer.model";
import { CONFIRM_NEW_PASSWORD, NEW_PASSWORD, SUBMIT } from "../../../../../modules/shared/tag/tag.model";
import { getRandomString } from "../../../../helpers/shared/helpers/string.helper";

it('Reset Password page -> Reset Password -> When user access this page from their Reset Password Email, then their can reset their password', () => {
    const newPassword = getRandomString(6);
    const values = {
        newPassword,
        confirmPassword: newPassword
    };
    const fields = [NEW_PASSWORD, CONFIRM_NEW_PASSWORD];

    cy
        .visit(customerUrl.resetPassword(1, 'token'))
        .fillTextFields(fields, values)
    cy
        .getEl(SUBMIT).click();

});