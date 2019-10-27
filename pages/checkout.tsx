import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import Checkout from '../modules/checkout/checkout.component';
import shoppingCart from '../modules/shopping-cart/shopping-cart.slice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            // width: 500,
            // height: 450,
        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);

interface RootState {
    placeholderData: {
        content: any[]
    }
}

function CheckoutPage(props) {
    const classes = useStyles(props);
    const data = useSelector(
        (state) => state.shoppingCart
    )

    return (
        <Checkout data={data} />
    );
}

CheckoutPage.getInitialProps = function(props) {
    const { store, isServer } = props.ctx;

    if (
        store.getState().shoppingCart.length === 0
    ) {
        store.dispatch(shoppingCart.actions.getCartPending());
    }

    return { isServer }
}

export default CheckoutPage
