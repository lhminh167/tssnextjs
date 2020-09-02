import { SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { randomString } from "../../../support/commands";


export default function CreateCustomerComponentTest() {

    describe('CreateCustomerComponentTest', () => {

        it('should register successfully and go to homepage if register page was accessed directly', () => {

            const randomStr = randomString(5);

            cy.typeRegister({
                name: randomStr,
                email: randomStr + '@mail.com',
                password: randomStr
            });

            cy.getEl(SUBMIT).click();
            cy.load('/');

        });

        it('should register successfully and go back to the specified previous page', () => {

            // const randomStr = randomString(5);

            // cy.typeRegister({
            //     name: randomStr,
            //     email: randomStr + '@mail.com',
            //     password: randomStr
            // });

            // cy.getEl(SUBMIT).click();
            // cy.load('/');

        });

    });
}

