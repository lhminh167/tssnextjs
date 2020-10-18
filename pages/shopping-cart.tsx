import Container from "@material-ui/core/Container";
import React from "react";
import LazyLoad from "react-lazyload";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { ShoppingCartMetadataComponent } from "../modules/shopping-cart/detail/shopping-cart-metadata.component";
import ShoppingCartComponent from "../modules/shopping-cart/detail/shopping-cart.component";
import ShoppingCartProductRecommendationGalleryComponent from "../modules/shopping-cart/recommendation/shopping-cart-recommendation-gallery.component";

function ShoppingCartPage(props) {

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

export default ShoppingCartPage;