import { Customer } from "../../../../modules/customer/customer.model"
import { EMAIL, NAME, ROLE, tag, USER } from "../../../../modules/shared/tag/tag.model"

export function UserPopoverDetailTest(user: Customer) {
    cy.getEl(USER).trigger('mouseover');
    cy.getEl(tag(NAME, '', USER)).should('have.text', user.name)
    cy.getEl(tag(EMAIL, '', USER)).should('have.text', user.email)
    cy.getEl(tag(ROLE, '', USER)).should('have.text', user.role)
}


