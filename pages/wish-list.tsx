import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../modules/root/root.model";
import { redirect } from "../modules/shared/helpers/auth.helper";
import { getLoginToken } from "../modules/shared/helpers/token.helper";
import { IShopingCartItem } from "../modules/shopping-cart/shopping-cart.model";
import WishListComponent from "../modules/wish-list/wish-list.component";
import { wishListSlice } from "../modules/wish-list/wish-list.slice";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
);

export default function WishListPage() {
    const dispatch = useDispatch();
    const data: IShopingCartItem[] = useSelector(
        (state: IRootState) => state.wishList.data
    );
    useEffect(() => {
        if (data.length === 0)
            dispatch(wishListSlice.actions.getWishlistPending());
    }, [])

    return <WishListComponent data={data} />;
}

WishListPage.getInitialProps = async function ({
    ctx: {
        isServer,
        store
    },
    ctx
}) {
    if (!isServer && !getLoginToken()) {
        redirect(ctx, '/user/login');
        return;
    }
}
