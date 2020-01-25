import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import ShoppingCartItemList from "./item-list/item-list.component";
import { IShopingCartItem } from "./shopping-cart.model";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  })
);

interface IProps {
  data: IShopingCartItem[];
}

function ShoppingCartComponent(props: IProps) {
  const classes = useStyles({});
  const { data } = props;
  return <ShoppingCartItemList data={data} />;
}

export default ShoppingCartComponent;
