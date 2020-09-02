import NavbarComponentTest from "../../component/shared/navbar/navbar.component.spec";
import { DepartmentListMetadataComponentTest } from "../../component/department/list/department-list-metadata.component.spec";

describe('Department and Category List page', () => {

  beforeEach(() => {
    cy.visit('/department');
  });


  DepartmentListMetadataComponentTest();
  NavbarComponentTest();

});