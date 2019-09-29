import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import useTheme from '@material-ui/styles/useTheme';
import React, { useEffect } from 'react';
import { useDispatch } from 'reactive-react-redux';
import Image from '../../../shared/image/image';
import { IShopingCartItem } from '../../shopping-cart.model';
import shoppingCart from '../../../shopping-cart/shopping-cart.slice';

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

interface IProps {
    input: IShopingCartItem;
    color: string
}


function ShoppingCartItemDetail(props: IProps) {
    const classes = useShoppingCartStyles({});
    const theme = useTheme();

    const { input, color } = props;

    const dispatch = useDispatch();

    useEffect(() => {

        return () => { return; };
    }, []);

    function removeItem() {
        dispatch(shoppingCart.actions.removeItemPending({content: {
            itemId: input.itemId
        }}));
    }

    function saveItemForLater() {
        dispatch(shoppingCart.actions.saveItemForLaterPending({content: {
            itemId: input.itemId
        }}));
    }

    return (
        <div className={classes.card}>
            {input && input.image &&
                <Image
                    imageName={input.image}
                    imageStyles={{
                        width: 100,
                    }}
                />
            }
            <div className={classes.details}>

                <CardContent className={classes.content}>
                    <Typography variant="body1" className={classes.title}>
                        {color} {input.name}
                    </Typography>
                </CardContent>

                <div className={classes.controls}>

                    <Button color="primary" className={classes.button} size="small"
                    onClick={saveItemForLater}
                    >
                        <BookmarkIcon className={classes.leftIcon} fontSize="small" />
                        Save for later
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

export default ShoppingCartItemDetail;