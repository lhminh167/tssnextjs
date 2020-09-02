import AdminListComponentTest from "../../component/admin/list/admin-list.component.spec";
import { AdminListMetadataComponentTest } from "../../component/admin/list/admin-list-metadata.component.spec";

describe('Admin Area page', () => {

  beforeEach(() => {
    cy.visit('/admin');
  });

  AdminListMetadataComponentTest();

  AdminListComponentTest();

});
