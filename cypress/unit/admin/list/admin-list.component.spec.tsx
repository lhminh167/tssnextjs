import { ADMIN_AREA_TITLE, ADD_NEW_PRODUCT } from "../../../../modules/admin/list/admin-list.tag";


export default function AdminListComponentTest() {
    describe('AdminListComponentTest', () => {

        it('Meta tags should exist', () => {

            cy.getEl(ADMIN_AREA_TITLE);

            cy.getEl(ADD_NEW_PRODUCT).click().getLink().load();


        });

    });
}
