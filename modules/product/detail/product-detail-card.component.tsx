import { Button, createStyles, Fab, Grid, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
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
import { getRole } from '../../shared/helpers/auth.helper';
import { encodeAttributes } from '../../shared/helpers/product.helper';
import { formatCurrency, toUrl } from '../../shared/helpers/string.helper';
import Image from '../../shared/image/image';
import { defaultAttributeValue } from '../../shared/models/attribute-value.model';
import { IProduct } from '../../shared/models/product.model';
import QuantityPicker from '../../shared/quantity-picker/quantity-picker.component';
import SizePicker from '../../shared/size-picker/size-picker.component';
import { shoppingCartSlice } from '../../shopping-cart/shopping-cart.slice';
import { ProductFilterFilterEnum } from '../filter/product-filter.model';
import { removeProduct } from './product-detail.service';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            padding: theme.spacing(2),

        }
    }),
);

interface Props {
    data?: IProduct;
}

export default function ProductDetailCardComponent({
    data
}: Props) {
    const router = useRouter();
    const colors = data ?.attributes ?.filter(a => a.attributeId === ProductFilterFilterEnum.Color);
    const sizes = data ?.attributes ?.filter(a => a.attributeId === ProductFilterFilterEnum.Size);
    const classes = useStyles({});
    const dispatch = useDispatch();
    const [quantity, setQuantity] = React.useState(1);
    const [color, setColor] = React.useState(colors ?.length ? colors[0] : defaultAttributeValue);
    const [size, setSize] = React.useState(sizes ?.length ? sizes[0] : defaultAttributeValue);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const isAdmin = useSelector<IRootState, boolean>(
        state => getRole(state.currentUser.data) === "Admin"
    );

    function handleAddToCart(buyNow: boolean) {
        dispatch(shoppingCartSlice.actions.addItemPending({
            productId: data.productId,
            quantity,
            attributes: encodeAttributes([
                color, size
            ]),
            buyNow
        }));
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
        router.push('/');
        closeDialog();
    }

    return (
        <Card
            className={classes.card}
            raised
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                    <Image
                        imageName={data.thumbnail}
                        imageStyles={{
                            width: "100%"
                        }}
                    />
                </Grid>
                <Grid item container sm={7}>
                    <Grid item xs={12}>
                        <Typography
                            component="h1"
                            variant="h5"
                            gutterBottom
                        >
                            {data.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            component="h2"
                            variant="subtitle1"
                            color="primary"
                            gutterBottom
                        >
                            {formatCurrency(data.discountedPrice ?? data.price)}
                        </Typography>
                    </Grid>
                    {
                        data.discountedPrice &&
                        <Grid item xs={6}>
                            <Typography
                                component="s"
                                variant="subtitle1"
                                color="initial"
                                gutterBottom
                            >
                                {formatCurrency(data.price)}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <Typography
                            component="p"
                            variant="subtitle2"
                            gutterBottom
                        >
                            {data.description}
                        </Typography>
                    </Grid>
                    {
                        isAdmin &&
                        <Fragment>
                            <Grid item xs={12}>
                                <Link
                                    href={{
                                        pathname: '/product/[productName]/edit',
                                        query: {
                                            productId: data.productId
                                        }
                                    }}
                                    as={`/product/${toUrl(data.name)}/edit?productId=${data.productId}`}
                                    passHref
                                >
                                    <Button
                                        component="a"
                                        color="primary"
                                        variant="contained"
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    onClick={openDialog}
                                    color="inherit"
                                    variant="contained"
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Fragment>
                    }
                    <Grid item xs={12}>
                        <SizePicker
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
                    >
                        <QuantityPicker quantity={quantity} output={(quantity) => setQuantity(quantity)} />
                    </Grid>
                    <Grid item container>
                        <Grid item sm={6}>
                            <Fab
                                variant="extended"
                                color="primary"
                                onClick={() => { handleAddToCart(true) }}
                            >
                                Add To Cart
                            </Fab>
                        </Grid>
                        <Grid item sm={6}>
                            <Button
                                onClick={() => { handleAddToCart(false) }}
                            >
                                <FavoriteBorderIcon
                                    color="primary"
                                />
                                Add to Wish List
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <ConfirmationDialog
                open={isDialogOpen}
                close={null}
                confirm={deleteProduct}
                decline={closeDialog}
                isLoading={isLoading}
            ></ConfirmationDialog>
        </Card >

    );
}
