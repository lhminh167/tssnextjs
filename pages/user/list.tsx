import { Container } from "@material-ui/core";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import CustomerListComponent from "../../modules/customer/list/customer-list.component";
import { allowAdminHoc } from "../../modules/shared/allow/allow-admin.component";


function CustomerListPage() {

    return (
        <Container>
            <ErrorBoundary>
                <CustomerListComponent
                />
            </ErrorBoundary>
            {/* <ErrorBoundary>
                <CustomerIndexMetadataComponent
                />
            </ErrorBoundary> */}
        </Container>
    );
}

export default allowAdminHoc(CustomerListPage);