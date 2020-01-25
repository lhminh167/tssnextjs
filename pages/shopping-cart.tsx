import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../modules/root/root.model";
import ShoppingCartComponent from "../modules/shopping-cart/shopping-cart.component";
import { IShopingCartItem } from "../modules/shopping-cart/shopping-cart.model";
import { shoppingCartSlice } from "../modules/shopping-cart/shopping-cart.slice";
import { getCustomerIdFromStore, redirect } from "../modules/shared/helpers/auth.helper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    gridList: {},
    icon: {}
  })
);

function ShoppingCartPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(shoppingCartSlice.actions.getCartPending());
  }, []);

  const data: IShopingCartItem[] = useSelector(
    (state: IRootState) => state.shoppingCart.data
  );

  return <ShoppingCartComponent data={data} />;
}

ShoppingCartPage.getInitialProps = async function ({
  ctx: {
    isServer,
    store
  },
  ctx
}) {
  if (
    !isServer &&
    getCustomerIdFromStore(store) <= 0
  )
    redirect(ctx, '/user/login');
}

export default ShoppingCartPage;
