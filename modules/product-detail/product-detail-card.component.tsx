import { Button, createStyles, Fab, Grid, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ProductFilterFilterEnum } from '../product-filter/product-filter.model';
import ColorPicker from '../shared/color-picker/color-picker.component';
import { encodeAttributes } from '../shared/helpers/product.helper';
import Image from '../shared/image/image';
import { defaultAttributeValue } from '../shared/models/attribute-value.model';
import { IProduct } from '../shared/models/product.model';
import QuantityPicker from '../shared/quantity-picker/quantity-picker.component';
import SizePicker from '../shared/size-picker/size-picker.component';
import { shoppingCartSlice } from '../shopping-cart/shopping-cart.slice';

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

export default function ProductDetailCardComponent(props: Props) {
    const { data } = props;
    const colors = data?.attributes?.filter(a => a.attributeId === ProductFilterFilterEnum.Color);
    const sizes= data?.attributes?.filter(a => a.attributeId === ProductFilterFilterEnum.Size);
    const classes = useStyles({});
    const dispatch = useDispatch();
    const [quantity, setQuantity] = React.useState(1);
    const [color, setColor] = React.useState(colors?.length ? colors[0] : defaultAttributeValue);
    const [size, setSize] = React.useState(sizes?.length ? sizes[0] : defaultAttributeValue);

    function handleAddToCart() {
        dispatch(shoppingCartSlice.actions.addItemPending({
            productId: data.productId,
            quantity,
            attributes: encodeAttributes([
                color, size
            ])
        }));
    }

    return (
        <Card
            className={classes.card}
            raised
        >
            <Grid container spacing={3}>
                <Grid item sm={5}>
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
                    <Grid item xs={12}>
                        <Typography
                            component="h2"
                            variant="subtitle2"
                            color="primary"
                            gutterBottom
                        >
                            {data.price}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ColorPicker 
                            data={colors} 
                            state={color}
                            output={setColor}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SizePicker 
                            data={sizes} 
                            state={size}
                            output={setSize}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <QuantityPicker quantity={quantity} output={(quantity) => setQuantity(quantity)} />
                    </Grid>
                    <Grid item container>
                        <Grid item sm={6}>
                            <Fab variant="extended" color="primary"
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </Fab>
                        </Grid>
                        <Grid item sm={6}>
                            <Button>
                                <FavoriteBorderIcon
                                    color="primary"
                                />
                                {/* <Typography 
                                     color="default"

                                 > */}
                                Add to Wish List
                                {/* </Typography> */}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card >

    );
}
