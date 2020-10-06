import { categoryUrl } from "../../../../modules/shared/models/category.model";
import { IDepartment } from "../../../../modules/shared/models/department.model";
import { CATEGORY, DEPARTMENT, DESCRIPTION, LINK, NAME, tag } from "../../../../modules/shared/tag/tag.model";

export default function DepartmentDetailTest(input: IDepartment) {
    cy
        .wrap(input).pipe(openDepartmentPanel)
        .should('have.text', input.name);
    cy
        .getEl(tag(DESCRIPTION, input.departmentId, DEPARTMENT))
        .should('have.text', input.description);

    input.category.forEach(category => {
        cy
            .getEl(tag(NAME, category.categoryId, CATEGORY))
            .should('have.text', category.name)
    });
}


export function openDepartmentPanel(input: IDepartment) {
    return cy
        .getEl(tag(NAME, input.departmentId, DEPARTMENT))
        .click();
}