import { BACK, NEXT } from "../../../../modules/shared/tag/tag.model";



export default function ProductHorizontalGalleryComponentTest() {
    cy.getEl(BACK).should('be.disabled')
    cy.getEl(NEXT).click()

}
