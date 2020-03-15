import { makeStyles, createStyles, Grid, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { OrderCreateRequest, OrderCreateForm } from "../create-order.model";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../../root/root.model";
import { IShopingCartItem } from "../../../shopping-cart/shopping-cart.model";
import React, { useEffect } from "react";
import { shoppingCartSlice } from "../../../shopping-cart/shopping-cart.slice";
import { decodeAttributes } from "../../../shared/helpers/product.helper";
import ActionButtonsComponent from "../shared/action-buttons.component";

const useStyles = makeStyles(theme =>
    createStyles({
        listItem: {
            // padding: theme.spacing(1, 0)
        },
        total: {
            // fontWeight: 700
        },
        title: {
            // marginTop: theme.spacing(2)
        }
    })
);

interface Props {
    data: OrderCreateRequest,
    form: OrderCreateForm;
    next: any;
    back: any;
}

export default function OrderConfirmationComponent({
    data,
    form,
    next,
    back
}: Props) {
    const classes = useStyles({});
    const state = useSelector<IRootState, IShopingCartItem[]>(
        state => state.shoppingCart.data
    );
    const dispatch = useDispatch();
    useEffect(() => {
        if (state.length) return;
        dispatch(shoppingCartSlice.actions.getCartPending());
    }, []);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                    Order summary
                </Typography>
                <TableContainer component={Paper}>
                    <Table
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Item</TableCell>
                                <TableCell align="right">Qty</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.map(row => {
                                return (
                                    <TableRow key={row.itemId}>
                                        <TableCell component="th" scope="row">
                                            {decodeAttributes(row.attributes).map(a => a.value).join(' ')} {row.product.name}
                                        </TableCell>
                                        <TableCell align="right">{row.quantity}</TableCell>
                                        <TableCell
                                            align="right"
                                            color="primary"
                                        >
                                            {row.product.discountedPrice > 0 ? row.product.discountedPrice : row.product.price}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="subtitle1" className={classes.total}>
                    $34.06
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography
                    variant="h6"
                >
                    Delivery
                </Typography>
                <Typography
                >
                    Address
                </Typography>
                <Typography
                >
                    {data.address1}
                </Typography>
                <Typography
                >
                    {data.address2}
                </Typography>
                <Typography
                >
                    Delivery options
                </Typography>
                <Typography
                >
                    Shipping
                </Typography>
                <Typography
                >
                    {form.shippings.find(s => s.shippingId === data.shippingId) ?.shippingType}
                </Typography>
                <Typography
                >
                    Shipping Region
                </Typography>
                <Typography
                >
                    {form.shippingRegions.find(s => s.shippingRegionId === data.shippingRegionId) ?.shippingRegion1}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ActionButtonsComponent
                    backButtonText={"Back"}
                    nextButtonText={"Next Step"}
                    back={back}
                    next={next}
                />
            </Grid>
        </Grid>
    );
}
