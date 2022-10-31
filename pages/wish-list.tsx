import Container from "@mui/material/Container";
import React from "react";
import LazyLoad from "react-lazyload";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import ShoppingCartProductRecommendationGalleryComponent from "../modules/shopping-cart/recommendation/shopping-cart-recommendation-gallery.component";
import { WishListMetadataComponent } from "../modules/shopping-cart/wish-list/wish-list-metadata.component";
import WishListComponent from "../modules/shopping-cart/wish-list/wish-list.component";


function WishListPage() {

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

export default WishListPage;