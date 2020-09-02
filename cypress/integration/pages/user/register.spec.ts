import { MetadataComponentTest } from "../../../component/shared/metadata/metadata.component.spec";
import NavbarComponentTest from "../../../component/shared/navbar/navbar.component.spec";
import CreateCustomerComponentTest from "../../../component/customer/create/create-customer.component.spec";
import { apiCustomerUrl, customerUrl } from "../../../../modules/customer/customer.model";
import { CreateCustomerMetadataComponentTest } from "../../../component/customer/create/create-customer-metadata.component.spec";

describe('Register page', () => {

    before(() => {
        cy.visit(customerUrl.register);
    });

    CreateCustomerMetadataComponentTest();

    NavbarComponentTest();

    CreateCustomerComponentTest();

});