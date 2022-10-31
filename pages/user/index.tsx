
import { Container } from "@mui/material";
import { CustomerIndexMetadataComponent } from "../../modules/customer/index/customer-index-metadata.component";
import CustomerIndexComponent from "../../modules/customer/index/customer-index.component";
import { allowCustomerHoc } from "../../modules/shared/allow/allow-customer.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";


function CustomerIndexPage() {

    return (
        <Container>
            <ErrorBoundary>
                <CustomerIndexComponent
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <CustomerIndexMetadataComponent
                />
            </ErrorBoundary>
        </Container>
    );
}

export default allowCustomerHoc(CustomerIndexPage);