import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import LazyLoad from "react-lazyload";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { redirect } from "../modules/shared/helpers/auth.helper";
import { getLoginToken } from "../modules/shared/helpers/token.helper";
import ShoppingCartProductRecommendationGalleryComponent from "../modules/shopping-cart/recommendation/shopping-cart-recommendation-gallery.component";
import WishListComponent from "../modules/shopping-cart/wish-list/wish-list.component";
import { useRouter } from "next/router";
import { WishListMetadataComponent } from "../modules/shopping-cart/wish-list/wish-list-metadata.component";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
);

export default function WishListPage() {
    const classes = useStyles();
    const router = useRouter();

    useEffect(() => {
        if (!getLoginToken()) router.push("/user/login");
    }, []);

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
