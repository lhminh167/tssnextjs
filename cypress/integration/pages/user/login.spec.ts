import LoginComponentTest from "../../../component/customer/login/login.component.spec";
import { MetadataComponentTest } from "../../../component/shared/metadata/metadata.component.spec";
import NavbarComponentTest from "../../../component/shared/navbar/navbar.component.spec";
import { apiCustomerUrl, customerUrl } from "../../../../modules/customer/customer.model";
import { LoginMetadataComponentTest } from "../../../component/customer/login/login-metadata.component.spec";

describe('Login page', () => {

    before(() => {
        cy.visit(customerUrl.login);
    });


    LoginMetadataComponentTest();

    NavbarComponentTest();

    LoginComponentTest();
});