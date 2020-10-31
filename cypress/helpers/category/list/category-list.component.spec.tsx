import { ICategory } from "../../../../modules/shared/models/category.model";
import { tag, LINK, CATEGORY, NAME } from "../../../../modules/shared/tag/tag.model";

export default function CategoryListTest(input: ICategory[]) {
    input.forEach(entry => {
        cy.getEl(tag(NAME, entry.categoryId, CATEGORY)).should('have.text', entry.name)
    })
}