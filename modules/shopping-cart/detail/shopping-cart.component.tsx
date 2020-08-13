import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductFilterFilterEnum } from "../../product/filter/product-filter.model";
import ActionButtonsComponent from "../../shared/action-buttons/action-buttons.component";
import { defaultRowsPerPageOptions } from "../../shared/crud/crud.model";
import { decodeAttributes } from "../../shared/helpers/product.helper";
import { formatCurrency } from "../../shared/helpers/string.helper";
import Image from "../../shared/image/image";
import { p, bold } from "../../shared/layout/layout.style";
import PaginationComponent from "../../shared/pagination/pagination.component";
import ShoppingCartQuantityPicker from "../quantity-picker/shopping-cart-quantity-picker.component";
import { defaultShopingCartGetRequest, defaultShoppingCart, IShopingCart, IShopingCartItem, ShopingCartGetRequest } from "../shopping-cart.model";
import { getShoppingCart, removeShoppingCartItem, saveShoppingCartItemForLater } from "../shopping-cart.service";
import { shoppingCartItemCountSlice } from "../shopping-cart.slice";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        p: p,
        bold: bold
    })
);

interface IProps {
}

export default function ShoppingCartComponent({

}: IProps) {
    const classes = useStyles({});
    const router = useRouter();
    const dispatch = useDispatch();
    const [choice, setChoice] = useState<ShopingCartGetRequest>(defaultShopingCartGetRequest);
    const [state, setState] = useState<IShopingCart>(defaultShoppingCart);

    useEffect(() => {
        getData(choice);
    }, [])

    async function getData(input: ShopingCartGetRequest) {
        const response = await getShoppingCart(input);
        setState(response.content);
        setChoice(input);
    }

    async function changePageIndex(
        event,
        pageIndex: number
    ) {
        await getData({
            ...choice,
            pageIndex
        });
    }

    async function changePageSize(
        event
    ) {
        await getData({
            ...choice,
            pageSize: parseInt(event.target.value, 10),
            pageIndex: defaultShopingCartGetRequest.pageIndex
        });
    }

    async function removeItem(input: IShopingCartItem) {
        await removeShoppingCartItem(input);
        await getData(choice);
        dispatch(shoppingCartItemCountSlice.actions.add(-input.quantity));

    }

    async function saveItemForLater(input: IShopingCartItem) {
        await saveShoppingCartItemForLater(input);
        await getData(choice);
        dispatch(shoppingCartItemCountSlice.actions.add(-input.quantity));
    }

    function back() {
        router.push('/');
    }

    function checkout() {
        router.push('/order/new');
    }

    return (
        <Paper>
            <div
                className={classes.p}

            >
                <Typography
                    variant="h6"
                    component="h2"
                >
                    {state.totalQuantity + ' Items In Your Cart'}
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                >
                                    Item
                            </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    Size
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    Quantity
                                </TableCell>
                                <TableCell
                                    align="center"
                                >
                                    Price
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                state?.items?.map(row => {
                                    const attributes = decodeAttributes(row.attributes);
                                    const color = attributes.find(e => e.name === ProductFilterFilterEnum.Color)?.value;
                                    const size = attributes.find(e => e.name === ProductFilterFilterEnum.Size)?.value;

                                    return (
                                        <TableRow key={row.itemId}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                <Image
                                                    imageName={row.product.image}
                                                    imageStyles={{
                                                        width: 100,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                <Grid
                                                    item
                                                    xs={12}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        className={classes.bold}
                                                    >
                                                        {color} {row.product.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    container
                                                    direction="row"
                                                >
                                                    <Button
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => saveItemForLater(row)}
                                                        startIcon={<BookmarkIcon
                                                            fontSize="small"
                                                        />}

                                                    >
                                                        Save for later
                                                </Button>
                                                    <Button
                                                        color="primary"
                                                        size="small"
                                                        onClick={() => removeItem(row)}
                                                        startIcon={<ClearRoundedIcon
                                                            fontSize="small"
                                                        />}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="center">{size}</TableCell>
                                            <TableCell align="center">
                                                <ShoppingCartQuantityPicker
                                                    data={row}
                                                />
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                            >
                                                <Typography
                                                    variant='subtitle1'
                                                    className={classes.bold}
                                                >
                                                    {formatCurrency(row.product.discountedPrice > 0 ? row.product.discountedPrice : row.product.price)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={defaultRowsPerPageOptions}
                    component="div"
                    count={state.count}
                    rowsPerPage={state.pageSize}
                    page={state.pageIndex}
                    onChangePage={changePageIndex}
                    onChangeRowsPerPage={changePageSize}
                    ActionsComponent={PaginationComponent}
                />
            </div>
            <ActionButtonsComponent
                backButtonText={'Back to Shop'}
                nextButtonText={'Checkout'}
                back={back}
                next={checkout}
                nextButtonDisabled={state.count === 0}
            />
        </Paper>
    )
}
