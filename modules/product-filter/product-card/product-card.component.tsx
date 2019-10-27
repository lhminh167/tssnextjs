import { Fab, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import Image from '../../shared/image/image';
import shoppingCart from '../../shopping-cart/shopping-cart.slice';
import { IProductFilterProduct } from '../product-filter.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: "center",
            // paddingTop: theme.spacing(3),
        },
        cardContent: {
        },
        cardActions: {
            justifyContent: "center",
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(3)
        },
    }),
);

interface IProps {
    data: IProductFilterProduct;
}

function ProductCard(props: IProps) {
    const classes = useStyles(props);
    const { data } = props;
    const dispatch = useDispatch();


    function addToCart()
    {
        dispatch(shoppingCart.actions.addItemPending({content: {
            productId: data.productId,
            quantity: 1,
            attributes: "Color/Size:White/XL"
        }}));
    }

    return (
        <div>
            <Card>
                <CardActionArea className={classes.root}>
                    <CardMedia>
                        {
                            <Image
                                imageName={data.thumbnail}
                                imageStyles={{
                                    width: "100%"
                                }}
                            />
                        }
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="subtitle1" gutterBottom>
                            {data.name}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom>
                            {data.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Fab variant="extended" color="primary"
                    onClick={addToCart}
                    >
                        Add To Cart
                    </Fab>
                </CardActions>
            </Card >
        </div>
    );
}

export default ProductCard;
