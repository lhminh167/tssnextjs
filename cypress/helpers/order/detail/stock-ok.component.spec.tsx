import { CANCEL, COMMENT, CONFIRM_STOCK, SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { Order } from "../order.model";

export function HiddenConfirmStockComponentTest() {
    cy.shouldNotExist(CONFIRM_STOCK);
    cy.shouldNotExist(COMMENT)
    cy.shouldNotExist(SUBMIT)
    cy.shouldNotExist(CANCEL)
    return cy;
}