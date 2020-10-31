import { Customer } from "../../../../modules/customer/customer.model"
import { getUserAvatar } from "../../../../modules/shared/helpers/string.helper";
import { EMAIL, NAME, ROLE, tag, USER } from "../../../../modules/shared/tag/tag.model"

export function UserPopoverDetailTest(user: Customer) {
    cy.getEl(USER).should('have.text', getUserAvatar(user.name)).trigger('mouseover');
    cy.getEl(tag(NAME, '', USER)).should('have.text', user.name)
    cy.getEl(tag(EMAIL, '', USER)).should('have.text', user.email)
    cy.getEl(tag(ROLE, '', USER)).should('have.text', user.role)
}


export function MobileAccountDetailTest(user: Customer) {
    cy.getEl(USER).should('have.text', getUserAvatar(user.name));
    cy.getEl(tag(NAME, '', USER)).should('have.text', user.name)
    cy.getEl(tag(EMAIL, '', USER)).should('have.text', user.email)
}


