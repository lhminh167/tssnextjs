import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import LazyLoad from "react-lazyload";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { redirect } from "../modules/shared/helpers/auth.helper";
import { getLoginToken } from "../modules/shared/helpers/token.helper";
import ShoppingCartComponent from "../modules/shopping-cart/detail/shopping-cart.component";
import ShoppingCartProductRecommendationGalleryComponent from "../modules/shopping-cart/recommendation/shopping-cart-recommendation-gallery.component";
import { ShoppingCartMetadataComponent } from "../modules/shopping-cart/detail/shopping-cart-metadata.component";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function ShoppingCartPage(props) {
  const classes = useStyles(props);
  const router = useRouter();

  useEffect(() => {
    if (!getLoginToken()) router.push("/user/login");
  }, []);

  return (
    <Container>
      <ErrorBoundary>
        <ShoppingCartComponent />
      </ErrorBoundary>
      <ErrorBoundary>
        <LazyLoad>
          <ShoppingCartProductRecommendationGalleryComponent />
        </LazyLoad>
      </ErrorBoundary>
      <ErrorBoundary>
        <ShoppingCartMetadataComponent />
      </ErrorBoundary>
    </Container>
  );
}
