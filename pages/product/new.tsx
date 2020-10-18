import { Container } from "@material-ui/core";
import { CreateProductMetadataComponent } from "../../modules/product/create/create-product-metadata.component";
import CreateProductComponent from "../../modules/product/create/create-product.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import { allowAdminHoc } from "../../modules/shared/allow/allow-admin.component";


function CreateProductPage() {

  return (
    <Container>
      <ErrorBoundary>
        <CreateProductComponent />
      </ErrorBoundary>
      <ErrorBoundary>
        <CreateProductMetadataComponent />
      </ErrorBoundary>
    </Container>
  );
}

export default allowAdminHoc(CreateProductPage);
