import { ICategory } from "../../../../modules/shared/models/category.model";
import { DESCRIPTION, NAME } from "../../../../modules/shared/tag/tag.model";

export function CategoryDetailTest(input: ICategory) {
    cy.getEl(NAME).should('have.text', input.name);
    cy.getEl(DESCRIPTION).should('have.text', input.description);
    return cy;
}