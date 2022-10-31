import Container from "@mui/material/Container";
import { CreateCustomerMetadataComponent } from "../../modules/customer/create/create-customer-metadata.component";
import RegisterComponent from "../../modules/customer/create/create-customer.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";

function RegisterPage(props: any) {
  return (
    <Container maxWidth="sm">
      <ErrorBoundary>
        <RegisterComponent />
      </ErrorBoundary>
      <ErrorBoundary>
        <CreateCustomerMetadataComponent />
      </ErrorBoundary>
    </Container>
  );
}

export default RegisterPage;
