import { Button, createStyles, Fab, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../root/root.model';
import ColorPicker from '../../shared/color-picker/color-picker.component';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { encodeAttributes } from '../../shared/helpers/product.helper';
import { formatCurrency, toUrl } from '../../shared/helpers/string.helper';
import { mb, mb2, mr, p } from '../../shared/layout/layout.style';
import { defaultAttributeValue } from '../../shared/models/attribute-value.model';
import { IProduct } from '../../shared/models/product.model';
import QuantityPickerComponent from '../../shared/quantity-picker/quantity-picker.component';
import SizePickerComponent from '../../shared/size-picker/size-picker.component';
import { addShoppingCartItem } from '../../shopping-cart/shopping-cart.service';
import { shoppingCartItemCountSlice } from '../../shopping-cart/shopping-cart.slice';
import { ProductFilterFilterEnum, productUrl } from '../filter/product-filter.model';
import ProductDetailImageComponent from './product-detail-image.component';
import { removeProduct } from './product-detail.service';
import { setLoginToken } from '../../shared/helpers/token.helper';
import { ADD_TO_CART, ADD_TO_WISH_LIST, NAME, PRICE, DISCOUNTED_PRICE, DESCRIPTION, EDIT, REMOVE } from '../../shared/tag/tag.model';
import { goTo } from '../../shared/helpers/auth.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mr: mr,
        mb: mb,
        mb2: mb2,
        p: p
    }),
);

interface Props {
    data?: IProduct;
}

export default function ProductDetailCardComponent({
    data
}: Props) {
    const router = useRouter();
    const colors = data?.attributes?.filter(a => a.name === ProductFilterFilterEnum.Color);
    const sizes = data?.attributes?.filter(a => a.name === ProductFilterFilterEnum.Size);
    const classes = useStyles({});
    const dispatch = useDispatch();
    const [quantity, setQuantity] = React.useState(1);
    const [color, setColor] = React.useState(colors?.length ? colors[0] : defaultAttributeValue);
    const [size, setSize] = React.useState(sizes?.length ? sizes[0] : defaultAttributeValue);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const isAdmin = useSelector<IRootState, boolean>(
        state => state.currentUser.data.role === 'Admin'
    );

    async function handleAddToCart(buyNow: boolean) {
        const response = await addShoppingCartItem({
            productId: data.productId,
            quantity,
            attributes: encodeAttributes([
                color, size
            ]),
            buyNow
        });

        if (buyNow) dispatch(shoppingCartItemCountSlice.actions.add(quantity));
        setLoginToken(response.content.loginToken);

    }

    function openDialog() {
        setIsDialogOpen(true);
    }

    function closeDialog() {
        setIsDialogOpen(false);
    }

    async function deleteProduct() {
        setIsLoading(true);
        await removeProduct(data.productId);
        goTo('/');
        closeDialog();
    }

    return (
        <Grid
            container
            spacing={3}
            className={classes.p}
        >
            <Grid item xs={12} sm={5}>
                <ProductDetailImageComponent
                    data={data}
                />
            </Grid>
            <Grid item container sm={7}>
                <Grid item xs={12}

                >
                    <Typography
                        component='h1'
                        variant='h4'
                        gutterBottom
                        data-cy={NAME}
                    >
                        {data.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}
                    container
                    direction='row'
                    alignItems='flex-end'
                    className={classes.mb}
                >
                    <Typography
                        component='h2'
                        variant='h5'
                        color='primary'
                        className={data.discountedPrice > 0 ? classes.mr : null}
                        data-cy={DISCOUNTED_PRICE}
                    >
                        {formatCurrency(
                            data.discountedPrice > 0
                                ? data.discountedPrice
                                : data.price
                        )}
                    </Typography>
                    {
                        data.discountedPrice > 0 &&
                        <Typography
                            component='s'
                            variant='subtitle1'
                            color='initial'
                            data-cy={PRICE}
                        >
                            {formatCurrency(data.price)}
                        </Typography>
                    }
                </Grid>
                <Grid item xs={12}
                    className={classes.mb}
                >
                    <Typography
                        component='p'
                        variant='subtitle2'
                        gutterBottom
                        data-cy={DESCRIPTION}
                    >
                        {data.description}
                    </Typography>
                </Grid>
                {
                    isAdmin &&
                    <Fragment>
                        <Grid item xs={12}>
                            <Link
                                href={productUrl.edit(data).href}
                                as={productUrl.edit(data).as}
                                passHref
                            >
                                <Button
                                    component='a'
                                    color='primary'
                                    variant='contained'
                                    className={classes.mr}
                                    data-cy={EDIT}
                                >
                                    Edit
                                    </Button>
                            </Link>
                            <Button
                                onClick={openDialog}
                                color='inherit'
                                variant='contained'
                                data-cy={REMOVE}
                            >
                                Delete
                                </Button>
                        </Grid>
                    </Fragment>
                }
                <Grid item xs={12}>
                    <SizePickerComponent
                        data={sizes}
                        state={size}
                        output={setSize}
                    />
                </Grid>
                <Grid item xs={12}>
                    <ColorPicker
                        data={colors}
                        state={color}
                        output={setColor}
                    />
                </Grid>
                <Grid item xs={12}
                    className={classes.mb2}
                >
                    <Typography
                        color='textPrimary'
                        gutterBottom
                    >
                        Quantity
                    </Typography>
                    <QuantityPickerComponent
                        quantity={quantity}
                        output={(quantity: number) => setQuantity(quantity)}
                    />
                </Grid>
                <Grid item container
                    xs={12}
                    alignItems='center'
                >
                    <Fab
                        variant='extended'
                        color='primary'
                        onClick={() => { handleAddToCart(true) }}
                        className={classes.mr + ' ' + classes.mb}
                        data-cy={ADD_TO_CART}
                    >
                        Add To Cart
                    </Fab>
                    <Button
                        className={classes.mb}
                        onClick={() => { handleAddToCart(false) }}
                        startIcon={
                            <FavoriteBorderIcon
                                color='primary'
                            />
                        }
                        data-cy={ADD_TO_WISH_LIST}
                    >
                        Add to Wish List
                    </Button>
                </Grid>
            </Grid>
            <ConfirmationDialog
                open={isDialogOpen}
                close={null}
                confirm={deleteProduct}
                decline={closeDialog}
                isLoading={isLoading}
            ></ConfirmationDialog>
        </Grid>
    );
}
