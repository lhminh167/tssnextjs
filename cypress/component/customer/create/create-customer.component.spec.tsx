import { ICreateCustomerRequest } from "../../../../modules/customer/customer.model";
import { currentUserSlice } from "../../../../modules/customer/customer.slice";
import { SUBMIT } from "../../../../modules/shared/tag/tag.model";
import { randomString } from "../../../support/commands";
import { cyDispatch } from "../../root/root.store";


export default function CreateCustomerComponentTest() {

    describe('CreateCustomerComponentTest', () => {

        it('should register user successfully', () => {

            cy.typeRegister(generateRandomAccount());
            cy.getEl(SUBMIT).click();
            cy.load('/');
        });

        // it('should register successfully and go back to the specified previous page', () => {

        // const randomStr = randomString(5);

        // cy.typeRegister({
        //     name: randomStr,
        //     email: randomStr + '@mail.com',
        //     password: randomStr
        // });

        // cy.getEl(SUBMIT).click();
        // cy.load('/');

        // });

    });
}

export function cyRegister(user: ICreateCustomerRequest) {
    cyDispatch(currentUserSlice.actions.createCustomerPending(user))
    cy.load('/');
}

export function generateRandomAccount(): ICreateCustomerRequest {
    const randomStr = randomString(5);
    return {
        name: randomStr,
        email: randomStr + '@mail.com',
        password: randomStr
    };
}
