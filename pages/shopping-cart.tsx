import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import LazyLoad from "react-lazyload";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { allowCustomer } from "../modules/shared/helpers/auth.helper";
import { ShoppingCartMetadataComponent } from "../modules/shopping-cart/detail/shopping-cart-metadata.component";
import ShoppingCartComponent from "../modules/shopping-cart/detail/shopping-cart.component";
import ShoppingCartProductRecommendationGalleryComponent from "../modules/shopping-cart/recommendation/shopping-cart-recommendation-gallery.component";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function ShoppingCartPage(props) {
  const classes = useStyles(props);

  useEffect(() => allowCustomer(), []);

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
