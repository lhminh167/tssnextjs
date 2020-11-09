import ChangePasswordComponent from '../../modules/customer/change-password/change-password.component';
import { CONFIRM_NEW_PASSWORD, SUBMIT } from '../../modules/shared/tag/tag.model';
import { typeChangePasswordForm } from '../helpers/customer/change-password/change-password.component.spec';
import { mockRandomCustomer } from '../helpers/shared/helpers/auth.helper';
import { cyIt } from "../helpers/shared/helpers/other.helper";
import { cyMount, CyMountProps } from '../helpers/shared/layout/layout.component.spec';

cyIt.run('Change Password Component -> When user click a navigation button, then gallery shows the corresponding slide. When there is no corresponding slide, then the corresponding navigation button is disabled #unit-working', () => {
    cy
        .wrap<CyMountProps>({
            Component: ChangePasswordComponent,
            props: { userId: 1 }
        })
        .pipe(cyMount)
        .pipe(mockRandomCustomer)
        .then(res => ({ ...res, confirmNewPassword: res.password }))
        .pipe(typeChangePasswordForm)

    cy.getEl(SUBMIT).click()
    cy.getEl(CONFIRM_NEW_PASSWORD).within(() => {
        cy.get('.MuiFormHelperText-root').should('have.text', 'New Password and Confirm New Password fields do not match')
    })
});