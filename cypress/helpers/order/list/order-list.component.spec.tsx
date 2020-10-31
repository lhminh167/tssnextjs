import { Order } from "../../../../modules/order/order.model"
import { formatDatetime } from "../../../../modules/shared/helpers/string.helper"
import { tag, ID, ORDER, STATUS, USER, NAME, CREATED_ON, DATETIME, SHIPPING } from "../../../../modules/shared/tag/tag.model"

export function OrderListItemDetailTest(input: Order) {
    cy
        .getEl(tag(ID, input.orderId, ORDER))
        .should('have.text', input.orderId)
    cy
        .getEl(tag(STATUS, input.orderId, ORDER))
        .should('have.text', input.orderStatus.message)
    cy
        .getEl(tag(USER + NAME, input.orderId, ORDER))
        .should('have.text', input.customer.name)
    cy
        .getEl(tag(CREATED_ON, input.orderId, ORDER))
        .should('have.text', formatDatetime(input.createdOn))
    if (input.shippedOn)
        cy
            .getEl(tag(SHIPPING + DATETIME, input.orderId, ORDER))
            .should('have.text', formatDatetime(input.createdOn))
}


export function OrderListItemDetailHiddenTest(input: Order) {
    cy.shouldNotExist(tag(ID, input.orderId, ORDER))
    cy.shouldNotExist(tag(STATUS, input.orderId, ORDER))
    cy.shouldNotExist(tag(USER + NAME, input.orderId, ORDER))
    cy.shouldNotExist(tag(CREATED_ON, input.orderId, ORDER))
    if (input.shippedOn) cy.shouldNotExist(tag(SHIPPING + DATETIME, input.orderId, ORDER))
}