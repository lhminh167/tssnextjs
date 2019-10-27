import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import ShoppingCart from '../modules/shopping-cart/shopping-cart.component';
import shoppingCart from '../modules/shopping-cart/shopping-cart.slice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        gridList: {
        },
        icon: {
        },
    }),
);

interface RootState {
    placeholderData: {
        content: any[]
    }
}

function ShoppingCartPage(props) {
    const classes = useStyles(props);
    const data = useSelector(
        (state) => state.shoppingCart.data
    )

    return (
        <ShoppingCart data={data} />
    );
}

ShoppingCartPage.getInitialProps = function(props) {
    const { store, isServer } = props.ctx;

    if (
        store.getState().shoppingCart.data.length === 0
    ) {
        store.dispatch(shoppingCart.actions.getCartPending());
    }

    return { isServer }
}

export default ShoppingCartPage
