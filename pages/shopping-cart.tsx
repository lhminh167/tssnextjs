import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../modules/root/root.model";
import ShoppingCartComponent from "../modules/shopping-cart/shopping-cart.component";
import { IShopingCartItem } from "../modules/shopping-cart/shopping-cart.model";
import { shoppingCartSlice } from "../modules/shopping-cart/shopping-cart.slice";
import { getCustomerIdNumberFromStore, redirect } from "../modules/shared/helpers/auth.helper";
import { getLoginToken } from "../modules/shared/helpers/token.helper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  })
);

function ShoppingCartPage(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data.length === 0)
      dispatch(shoppingCartSlice.actions.getCartPending());
  }, [])
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
  if (!isServer && !getLoginToken()) {
    redirect(ctx, '/user/login');
    return;
  }
}

export default ShoppingCartPage;
