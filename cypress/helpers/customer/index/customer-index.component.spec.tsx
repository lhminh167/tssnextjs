import { customerUrl } from "../../../../modules/customer/customer.model";
import { DETAIL, EDIT, NEW_PASSWORD, USER } from "../../../../modules/shared/tag/tag.model";
import { cyLogin } from "../login/login.component.spec";
import { getRandomCustomerAccount } from "../../../support/commands";
import { cyRegister } from "../create/create-customer.component.spec";

export default function CustomerIndexComponentTest() {

    describe('CustomerDetailComponentTest', () => {

        describe('View Customer link', () => {

            VisitCustomerIndexPageAsCustomer();

            it('should redirect to Customer Detail page when clicked', () => {
                cy
                    .getEl(DETAIL)
                    // .as('detail')
                    // .get('@createdUser')
                    // .should((res: any) =>
                    //     cy.get('@detail').getLink().should('have.value', customerUrl.baseUrl + '/' + res.content.customer.customerId)
                    // )
                    .click()
                    .getLink()
                    .load();
            })

        })

        describe('Edit Customer link', () => {

            VisitCustomerIndexPageAsCustomer();

            it('should redirect to Edit Customer page when clicked', () => {
                cy.getEl(EDIT).click().getLink().load();

            })

        })

        describe('Change Password link', () => {

            VisitCustomerIndexPageAsCustomer();

            it('should redirect to Change Password page when clicked', () => {
                cy.getEl(NEW_PASSWORD).click().getLink().load();
            })

        })
    })
}

export function VisitCustomerIndexPageAsCustomer() {
    beforeEach(() => {
        cy
            .wrap(getRandomCustomerAccount()).as('user')
            .then(res => cyRegister(res)).as('createdUser')
            .get('@user').then((res: any) => cyLogin(res))
            .open(customerUrl.baseUrl).location().its('pathname').load()
        cy
            .getEl(USER);
    })
}