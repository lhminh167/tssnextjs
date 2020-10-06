import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ActionButtonsComponent from '../../shared/action-buttons/action-buttons.component';
import { defaultRowsPerPageOptions } from '../../shared/crud/crud.model';
import { isAnonymous } from '../../shared/helpers/auth.helper';
import { decodeAttributes, getCartItemColor, getCartItemSize } from '../../shared/helpers/product.helper';
import { formatCurrency } from '../../shared/helpers/string.helper';
import ImageComponent from '../../shared/image/image.component';
import { bold, p } from '../../shared/layout/layout.style';
import PaginationComponent from '../../shared/pagination/pagination.component';
import { COLOR, COUNT, DISCOUNTED_PRICE, tag, ITEM, MOVE_ITEM_TO_CART, NAME, REMOVE, SHOPPING_CART, SIZE } from '../../shared/tag/tag.model';
import ShoppingCartQuantityPickerComponent from '../quantity-picker/shopping-cart-quantity-picker.component';
import { defaultShopingCartGetRequest, defaultShoppingCart, IShopingCart, IShopingCartItem, ShopingCartGetRequest } from '../shopping-cart.model';
import { getShoppingCart, moveShoppingCartItemToCart, removeShoppingCartItem } from '../shopping-cart.service';
import { shoppingCartItemCountSlice } from '../shopping-cart.slice';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        p: p,
        bold: bold
    })
);

interface IProps {
}

export default function WishListComponent({

}: IProps) {
    const classes = useStyles({});
    const router = useRouter();
    const dispatch = useDispatch();
    const [choice, setChoice] = useState<ShopingCartGetRequest>({
        ...defaultShopingCartGetRequest,
        buyNow: false
    });
    const [state, setState] = useState<IShopingCart>(defaultShoppingCart);

    useEffect(() => {
        getData(choice);
    }, [])

    async function getData(input: ShopingCartGetRequest) {
        if (!isAnonymous()) return;
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
    }

    async function moveItemToCart(input: IShopingCartItem) {
        await moveShoppingCartItemToCart(input);
        await getData(choice);
        dispatch(shoppingCartItemCountSlice.actions.add(input.quantity));
    }

    function back() {
        router.push('/');
    }

    function next() {
        router.push('/shopping-cart');
    }

    return (
        <Paper>
            <div
                className={classes.p}
            >
                <Typography
                    variant='h6'
                    component='h2'
                >
                    <span
                        data-cy={COUNT}
                    >
                        {state.totalQuantity}
                    </span>
                    {' Items In Your Wish List'}
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
                                    align='center'
                                >
                                    Size
                                </TableCell>
                                <TableCell
                                    align='center'
                                >
                                    Quantity
                                </TableCell>
                                <TableCell
                                    align='center'
                                >
                                    Price
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                state?.items?.map(row => {
                                    const attributes = decodeAttributes(row.attributes);
                                    const color = getCartItemColor(attributes);
                                    const size = getCartItemSize(attributes);

                                    return (
                                        <TableRow key={row.itemId}
                                            data-cy={tag(ITEM, row.itemId, SHOPPING_CART)}
                                            data-id={row.itemId}
                                        >
                                            <TableCell
                                                component='th'
                                                scope='row'
                                            >
                                                <ImageComponent
                                                    imageName={row.product.image}
                                                    imageStyles={{
                                                        width: 100,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component='th'
                                                scope='row'
                                            >
                                                <Grid
                                                    item
                                                    xs={12}
                                                >
                                                    <Typography
                                                        variant='body1'
                                                        className={classes.bold}
                                                    >
                                                        <span
                                                            data-cy={COLOR}
                                                        >
                                                            {color}
                                                        </span>
                                                        {' '}
                                                        <span
                                                            data-cy={NAME}
                                                        >
                                                            {row.product.name}
                                                        </span>
                                                    </Typography>
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={12}
                                                    container
                                                    direction='row'
                                                >
                                                    <Button
                                                        color='primary'
                                                        size='small'
                                                        onClick={() => moveItemToCart(row)}
                                                        startIcon={<BookmarkIcon
                                                            fontSize='small'
                                                        />}
                                                        data-cy={MOVE_ITEM_TO_CART}
                                                    >
                                                        Move to Cart
                                                    </Button>
                                                    <Button
                                                        color='primary'
                                                        size='small'
                                                        onClick={() => removeItem(row)}
                                                        startIcon={<ClearRoundedIcon
                                                            fontSize='small'
                                                        />}
                                                        data-cy={REMOVE}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align='center'
                                                data-cy={SIZE}
                                            >
                                                {size}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <ShoppingCartQuantityPickerComponent
                                                    data={row}
                                                />
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                            >
                                                <Typography
                                                    variant='subtitle1'
                                                    className={classes.bold}
                                                    data-cy={DISCOUNTED_PRICE}
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
                    component='div'
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
                nextButtonText={'Go to Cart'}
                back={back}
                next={next}
            />
        </Paper>
    )
}
