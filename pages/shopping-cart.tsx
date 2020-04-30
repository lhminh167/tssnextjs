import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import LazyLoad from "react-lazyload";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { redirect } from "../modules/shared/helpers/auth.helper";
import { getLoginToken } from "../modules/shared/helpers/token.helper";
import ShoppingCartComponent from "../modules/shopping-cart/detail/shopping-cart.component";
import ShoppingCartProductRecommendationGalleryComponent from "../modules/shopping-cart/recommendation/shopping-cart-recommendation-gallery.component";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

function ShoppingCartPage(props) {
  const classes = useStyles(props);

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
    </Container>
  );
}

ShoppingCartPage.getInitialProps = async function ({
  ctx: { isServer, store },
  ctx
}) {
  if (!isServer && !getLoginToken()) redirect(ctx, "/user/login");
};

export default ShoppingCartPage;
