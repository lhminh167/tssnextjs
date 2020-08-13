import { createStyles, makeStyles, Theme, Container } from "@material-ui/core";
import CreateProductComponent from "../../modules/product/create/create-product.component";
import { redirect } from "../../modules/shared/helpers/auth.helper";
import { getLoginToken } from "../../modules/shared/helpers/token.helper";
import ErrorBoundary from "../../modules/shared/error-boundary/error-boundary.component";
import { CreateProductMetadataComponent } from "../../modules/product/create/create-product-metadata.component";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function CreateProductPage(props) {
  const classes = useStyles(props);
  const router = useRouter();

  useEffect(() => {
    if (!getLoginToken()) router.push("/user/login");
  }, []);

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
