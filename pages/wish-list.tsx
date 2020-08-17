import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import LazyLoad from "react-lazyload";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { allowCustomer } from "../modules/shared/helpers/auth.helper";
import ShoppingCartProductRecommendationGalleryComponent from "../modules/shopping-cart/recommendation/shopping-cart-recommendation-gallery.component";
import { WishListMetadataComponent } from "../modules/shopping-cart/wish-list/wish-list-metadata.component";
import WishListComponent from "../modules/shopping-cart/wish-list/wish-list.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
);

export default function WishListPage() {
    const classes = useStyles();

    useEffect(() => allowCustomer(), []);

    return (
        <Container>
            <ErrorBoundary>
                <WishListComponent />
            </ErrorBoundary>
            <ErrorBoundary>
                <LazyLoad>
                    <ShoppingCartProductRecommendationGalleryComponent />
                </LazyLoad>
            </ErrorBoundary>
            <ErrorBoundary>
                <WishListMetadataComponent />
            </ErrorBoundary>
        </Container>
    );
}
