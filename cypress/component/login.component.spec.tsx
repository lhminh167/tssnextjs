import LoginComponent from '../../modules/customer/login/login.component';
import { EMAIL, SUBMIT } from '../../modules/shared/tag/tag.model';
import { typeLogin } from '../helpers/customer/login/login.component.spec';
import { mockRandomCustomer } from '../helpers/shared/helpers/auth.helper';
import { cyIt } from "../helpers/shared/helpers/other.helper";
import { cyMount, CyMountProps } from '../helpers/shared/layout/layout.component.spec';

cyIt.run('Login Component -> Email Address Validation -> When user submits an invalid email address, then an error message is shown #unit-working', () => {
    cy
        .wrap<CyMountProps>({
            Component: LoginComponent,
        })
        .pipe(cyMount)
        .pipe(mockRandomCustomer)
        .then(res => ({ ...res, email: res.password }))
        .pipe(typeLogin)

    cy.getEl(SUBMIT).click()
    cy.getEl(EMAIL).within(() => {
        cy.get('.MuiFormHelperText-root').should('have.text', 'Not a valid email address')
    })
});