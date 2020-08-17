import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { CreateProductMetadataComponent } from "../../modules/product/create/create-product-metadata.component";
import CreateProductComponent from "../../modules/product/create/create-product.component";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import { allowCustomer } from "../../modules/shared/helpers/auth.helper";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function CreateProductPage(props) {
  const classes = useStyles(props);

  useEffect(() => allowCustomer(), []);

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
