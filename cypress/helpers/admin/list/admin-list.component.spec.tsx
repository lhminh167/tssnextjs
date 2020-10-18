
import { ADMIN_AREA_TITLE, ADD_NEW_PRODUCT } from "../../../../modules/shared/tag/tag.model";
import { beforeEach } from "mocha";

export default function AdminListComponentTest() {
    describe('AdminListComponentTest', () => {

        beforeEach(() => {

        })
        it('Meta tags should exist', () => {


            // cy.getEl(ADMIN_AREA_TITLE);

        });

        it('should allow user to go to Add New Product page', () => {
            cy.getEl(ADD_NEW_PRODUCT).click().getLink().load();
        })

    });
}
