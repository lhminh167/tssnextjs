import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import React from 'react';
import { useDispatch } from 'react-redux';
import { IShopingCartItem } from '../shopping-cart/shopping-cart.model';
import Image from '../shared/image/image';
import { wishListSlice } from './wish-list.slice';

export const useShoppingCartStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(1),
        },
        button: {
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        title: {
            fontWeight: "bold"
        }

    }),
);

interface Props {
    data: IShopingCartItem;
    color: string;
}

export default function WishListItemDetail({
    data,
    color
}: Props) {
    const classes = useShoppingCartStyles({});
    const dispatch = useDispatch();

    function removeItem() {
        dispatch(wishListSlice.actions.removeItemPending({
            itemId: data.itemId
        }));
    }

    function moveItemToCart() {
        dispatch(wishListSlice.actions.moveItemToCartPending({
            itemId: data.itemId
        }));
    }

    return (
        <div className={classes.card}>
            <Image
                imageName={data?.product?.image}
                imageStyles={{
                    width: 100,
                }}
            />
            <div className={classes.details}>

                <CardContent className={classes.content}>
                    <Typography variant="body1" className={classes.title}>
                        {color} {data?.product?.name}
                    </Typography>
                </CardContent>

                <div className={classes.controls}>

                    <Button color="primary" className={classes.button} size="small"
                        onClick={moveItemToCart}
                    >
                        <BookmarkIcon className={classes.leftIcon} fontSize="small" />
                        Move Item to Cart
                    </Button>

                    <Button color="primary" className={classes.button} size="small"
                        onClick={removeItem}
                    >
                        <ClearRoundedIcon className={classes.leftIcon} fontSize="small" />
                        Remove
                    </Button>

                </div>

            </div>

        </div>
    );
}
