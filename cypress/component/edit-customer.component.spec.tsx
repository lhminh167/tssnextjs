import CreateCustomerComponent from '../../modules/customer/create/create-customer.component';
import CustomerEditComponent from '../../modules/customer/edit/edit-customer.component';
import OrderListComponent from '../../modules/order/list/order-list.component';
import { EMAIL, SUBMIT } from '../../modules/shared/tag/tag.model';
import { typeUserEditForm } from '../helpers/customer/edit/edit-customer.component.spec';
import { typeLogin } from '../helpers/customer/login/login.component.spec';
import { mockRandomCustomer } from '../helpers/shared/helpers/auth.helper';
import { cyIt } from "../helpers/shared/helpers/other.helper";
import { cyMount, CyMountProps } from '../helpers/shared/layout/layout.component.spec';

cyIt.run('Edit Customer Component -> Email Address Validation -> When user submits an invalid email address, then an error message is shown #unit-working', () => {
    cy
        .wrap<CyMountProps>({
            Component: CustomerEditComponent,
            props: { user: 1 }
        })
        .pipe(cyMount)
        .pipe(mockRandomCustomer)
        .then(res => ({ ...res, email: res.password }))
        .chain(typeUserEditForm)

    cy.getEl(SUBMIT).click()
    cy.getEl(EMAIL).within(() => {
        cy.get('.MuiFormHelperText-root').should('have.text', 'Not a valid email address')
    })
});