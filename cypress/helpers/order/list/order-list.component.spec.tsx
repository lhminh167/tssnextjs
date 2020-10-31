import { Order } from "../../../../modules/order/order.model"
import { formatDatetime } from "../../../../modules/shared/helpers/string.helper"
import { tag, ID, ORDER, STATUS, USER, NAME, DATETIME, SHIPPING, ITEM } from "../../../../modules/shared/tag/tag.model"

export function OrderListItemDetailTest(input: Order) {
    cy.getEl(tag(ITEM, input.orderId, ORDER)).within(() => {

        cy.getEl(ID).should('have.text', input.orderId)
        cy.getEl(STATUS).should('have.text', input.orderStatus.message)
        cy.getEl(USER + NAME).should('have.text', input.customer.name)
        cy.getEl(DATETIME).should('have.text', formatDatetime(input.createdOn))
        cy.getEl(SHIPPING + DATETIME).should('have.text', formatDatetime(input.shippedOn))
    })
}


export function OrderListItemDetailHiddenTest(input: Order) {
    cy.shouldNotExist(tag(ITEM, input.orderId, ORDER))
}