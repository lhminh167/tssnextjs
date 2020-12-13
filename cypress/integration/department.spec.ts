import { getDepartments } from "../../modules/department/department.service";
import { departmentUrl } from "../../modules/shared/models/department.model";
import { CATEGORY, LINK, tag } from "../../modules/shared/tag/tag.model";
import DepartmentDetailTest, { openDepartmentPanel } from "../helpers/department/list/department-list.component.spec";
import { cyIt, getFirstEl, getRandomEl } from "../helpers/shared/helpers/other.helper";

cyIt.run('Department List Page -> Details -> When user accesses Department List Page, then department and catefory lists should be displayed correctly #priority-1-working #e2e-working #visual-working', () => {
  cy
    .visit(departmentUrl)
    .pipe(getDepartments).its('content').as('departments')
    .each((deparment: any) => DepartmentDetailTest(deparment))
  cy
    .get('@departments').pipe(getFirstEl).pipe(openDepartmentPanel)
    .takeScreenShot('Department List Page')
});


cyIt.run('Department List Page -> Category Link -> When user clicks a category item, then user is redirected to Category Detail Page #priority-3-working #e2e-working', () => {
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
