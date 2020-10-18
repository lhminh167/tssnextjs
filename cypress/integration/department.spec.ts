import { getDepartments } from "../../modules/department/department.service";
import { departmentUrl } from "../../modules/shared/models/department.model";
import { CATEGORY, LINK, tag } from "../../modules/shared/tag/tag.model";
import DepartmentDetailTest, { openDepartmentPanel } from "../helpers/department/list/department-list.component.spec";
import { getRandomEl } from "../helpers/shared/helpers/other.helper";

it('Department List Page -> Details -> When user accesses Department List Page, then department and catefory lists should be displayed correctly #working', () => {
  cy
    .visit(departmentUrl)
    .pipe(getDepartments).its('content')
    .each((deparment: any) => DepartmentDetailTest(deparment))
});


it('Department List Page -> Category Link -> When user click a category item, then user is redirected to Category Detail Page #working', () => {
  cy
    .visit(departmentUrl)
    .pipe(getDepartments).its('content')
    .pipe(getRandomEl).as('departments')
    .pipe(openDepartmentPanel)
    .get('@departments').its('category').pipe(getRandomEl)
    .chain(entry => cy
      .getEl(tag(LINK, entry.categoryId, CATEGORY))
      .chain(getRandomEl).click()
      .getLink().load()
    )
});
