import React, { Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IProductFilterProduct } from '../product-filter.model';
import { env } from '../../shared/configs/config';
import Image from '../../shared/image/image';
import { Theme, Fab } from '@material-ui/core';
import shoppingCart from '../../shopping-cart/shopping-cart.slice';
import { useDispatch } from 'reactive-react-redux';

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
    input: IProductFilterProduct;
}

function ProductCard(props: IProps) {
    const classes = useStyles(props);
    const { input } = props;
    const dispatch = useDispatch();


    function addToCart()
    {
        dispatch(shoppingCart.actions.addItemPending({content: {
            productId: input.productId,
            quantity: 1,
            attributes: "Color/Size:White/XL"
        }}));
    }

    return (
        <Fragment>
            <Card>
                <CardActionArea className={classes.root}>
                    <CardMedia>
                        {input && input.thumbnail &&
                            <Image
                                imageName={input.thumbnail}
                                imageStyles={{
                                    width: "100%"
                                }}
                            />
                        }
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="subtitle1" gutterBottom>
                            {input.name}
                        </Typography>

                        <Typography variant="subtitle2" gutterBottom>
                            {input.price}
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
        </Fragment>
    );
}

export default ProductCard;
