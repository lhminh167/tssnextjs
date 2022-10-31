import {
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { Fragment, useEffect, useState } from "react";
import ActionButtonsComponent from "../../../shared/action-buttons/action-buttons.component";
import {
  decodeAttributes,
  getCartItemColor,
  getCartItemSize,
} from "../../../shared/helpers/product.helper";
import { formatCurrency } from "../../../shared/helpers/string.helper";
import { bold, p } from "../../../shared/layout/layout.style";
import { getDiscountedPrice } from "../../../shared/models/product.model";
import {
  defaultShippingRegion,
  ShippingRegion,
} from "../../../shared/models/shipping-region.model";
import {
  defaultShipping,
  Shipping,
} from "../../../shared/models/shipping.model";
import { defaultTax, getTaxId, Tax } from "../../../shared/models/tax.model";
import {
  ADDRESS_1,
  ADDRESS_2,
  COLOR,
  DISCOUNTED_PRICE,
  GRAND_TOTAL,
  ITEM,
  NAME,
  ORDER_SUMMARY,
  QUANTITY,
  SHOPPING_CART,
  SIZE,
  tag,
} from "../../../shared/tag/tag.model";
import {
  defaultShopingCartGetRequest,
  IShopingCartItem,
} from "../../../shopping-cart/shopping-cart.model";
import { getShoppingCart } from "../../../shopping-cart/shopping-cart.service";
import { OrderCreateForm, OrderCreateRequest } from "../create-order.model";

const useStyles = makeStyles((theme) =>
  createStyles({
    bold: bold,
    p: p,
  })
);

interface Props {
  data: OrderCreateRequest;
  form: OrderCreateForm;
  next: any;
  back: any;
}

export default function OrderConfirmationComponent({
  data,
  form,
  next,
  back,
}: Props) {
  const classes = useStyles({});
  const [state, setState] = useState<IShopingCartItem[]>([]);
  const [shipping, setShipping] = useState<Shipping>(defaultShipping);
  const [shippingRegion, setShippingRegion] = useState<ShippingRegion>(
    defaultShippingRegion
  );
  const [tax, setTax] = useState<Tax>(defaultTax);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [grandTotal, setGrandTotal] = useState<number>(0);

  useEffect(() => {
    getShoppingCart({
      ...defaultShopingCartGetRequest,
      isPagingEnabled: false,
      pageSize: 0,
    }).then((response) => update(response.content.items));
  }, []);

  function update(input: IShopingCartItem[]) {
    setState(input);

    const shippingResult = form.shippings.find(
      (s) => s.shippingId === data.shippingId
    );
    if (!shippingResult) return;
    setShipping(shippingResult);

    const shippingRegionResult = form.shippingRegions.find(
      (s) => s.shippingRegionId === data.shippingRegionId
    );
    if (!shippingRegionResult) return;
    setShippingRegion(shippingRegionResult);

    const taxResult = form.taxes.find((t) => t.taxId === getTaxId(shipping));
    if (!taxResult) return;
    setTax(taxResult);

    const subtotalResult = input.reduce(
      (total, item, index, arr) =>
        total +
        (item.product.discountedPrice > 0
          ? item.product.discountedPrice
          : item.product.price) *
          item.quantity,
      0
    );
    setSubTotal(subtotalResult ?? 0);

    const grandtotalResult =
      subtotalResult +
      shippingResult.shippingCost +
      (subtotalResult * taxResult.taxPercentage) / 100;
    setGrandTotal(grandtotalResult ?? 0);
  }

  return (
    <Fragment>
      <Grid container spacing={2} className={classes.p}>
        <Grid item xs={12} sm={7}>
          <Typography
            className={classes.bold}
            gutterBottom
            data-cy={ORDER_SUMMARY}
          >
            Order summary
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell align="right">Qty</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.map((row) => {
                  const attributes = decodeAttributes(row.attributes);
                  const color = getCartItemColor(attributes);
                  const size = getCartItemSize(attributes);
                  const price = getDiscountedPrice(row.product);

                  return (
                    <TableRow
                      key={row.itemId}
                      data-cy={tag(ITEM, row.itemId, SHOPPING_CART)}
                    >
                      <TableCell component="th" scope="row">
                        <Typography data-cy={COLOR} component="span">
                          {color}
                        </Typography>{" "}
                        <Typography data-cy={SIZE} component="span">
                          {size}
                        </Typography>{" "}
                        <Typography data-cy={NAME} component="span">
                          {row.product.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" data-cy={QUANTITY}>
                        {row.quantity}
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          color="primary"
                          className={classes.bold}
                          data-cy={DISCOUNTED_PRICE}
                        >
                          {price}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography gutterBottom className={classes.bold}>
            Delivery
          </Typography>
          <Typography color="textSecondary" className={classes.bold}>
            Address
          </Typography>
          <Typography data-cy={ADDRESS_1}>{data.address1}</Typography>
          <Typography data-cy={ADDRESS_2} gutterBottom>
            {data.address2}
          </Typography>
          <Typography color="textSecondary" className={classes.bold}>
            Shipping
          </Typography>
          <Typography gutterBottom>{shipping.shippingType}</Typography>
          <Typography color="textSecondary" className={classes.bold}>
            Shipping Region
          </Typography>
          <Typography>{shippingRegion.shippingRegion1}</Typography>
          <Typography color="textSecondary" className={classes.bold}>
            Tax
          </Typography>
          <Typography>{tax.taxType}</Typography>
        </Grid>
        <Grid xs={12} item>
          <Divider
          // variant='middle'
          />
        </Grid>
        <Grid item xs={7}>
          <Typography color="textSecondary" className={classes.bold}>
            Subtotal
          </Typography>

          <Typography className={classes.bold}>
            {formatCurrency(subTotal)}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography color="textSecondary" className={classes.bold}>
            Grandtotal
          </Typography>
          <Typography
            variant="h5"
            className={classes.bold}
            data-cy={GRAND_TOTAL}
          >
            {formatCurrency(grandTotal)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ActionButtonsComponent
          backButtonText={"Back"}
          nextButtonText={"Next Step"}
          back={back}
          next={next}
        />
      </Grid>
    </Fragment>
  );
}
