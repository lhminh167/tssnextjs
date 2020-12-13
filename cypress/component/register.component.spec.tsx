import ChangePasswordComponent from '../../modules/customer/change-password/change-password.component';
import CreateCustomerComponent from '../../modules/customer/create/create-customer.component';
import { CONFIRM_NEW_PASSWORD, EMAIL, SUBMIT } from '../../modules/shared/tag/tag.model';
import { typeChangePasswordForm } from '../helpers/customer/change-password/change-password.component.spec';
import { typeRegister } from '../helpers/customer/create/create-customer.component.spec';
import { typeLogin } from '../helpers/customer/login/login.component.spec';
import { mockRandomCustomer } from '../helpers/shared/helpers/auth.helper';
import { cyIt } from "../helpers/shared/helpers/other.helper";
import { cyMount, CyMountProps } from '../helpers/shared/layout/layout.component.spec';

cyIt.run('Register Component -> Email Address Validation -> When user submits an invalid email address, then an error message is shown #priority-3-working #unit-working', () => {
    cy
        .wrap<CyMountProps>({
            Component: CreateCustomerComponent,
        })
        .pipe(cyMount)
        .pipe(mockRandomCustomer)
        .then(res => ({ ...res, email: res.password }))
        .pipe(typeRegister)

    cy.getEl(SUBMIT).click()
    cy.getEl(EMAIL).within(() => {
        cy.get('.MuiFormHelperText-root').should('have.text', 'Not a valid email address')
    })
});

cyIt.run('Register Component -> Unmatched Passwords -> When the entered New Password and Confirm New Password do not match, then an error message is shown #priority-3-working #unit-working', () => {
    cy
        .wrap<CyMountProps>({
            Component: CreateCustomerComponent,
        })
        .pipe(cyMount)
        .pipe(mockRandomCustomer)
        .then(res => ({ ...res, confirmNewPassword: res.newPassword }))
        .pipe(typeRegister)

    cy.getEl(SUBMIT).click()
    cy.getEl(CONFIRM_NEW_PASSWORD).within(() => {
        cy.get('.MuiFormHelperText-root').should('have.text', 'New Password and Confirm New Password fields do not match')
    })
});