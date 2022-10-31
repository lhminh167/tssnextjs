import { Container } from "@mui/material";
import { CreateProductMetadataComponent } from "../../modules/product/create/create-product-metadata.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import { allowAdminHoc } from "../../modules/shared/allow/allow-admin.component";
import CreateProductContainer from "../../modules/product/create/create-product.container";


function CreateProductPage() {

  return (
    <Container>
      <ErrorBoundary>
        <CreateProductContainer />
      </ErrorBoundary>
      <ErrorBoundary>
        <CreateProductMetadataComponent />
      </ErrorBoundary>
    </Container>
  );
}

export default allowAdminHoc(CreateProductPage);
