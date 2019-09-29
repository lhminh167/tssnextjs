import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import ShoppingCartItemList from './item-list/item-list.component';
import Checkout from './checkout/checkout.component';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        paper: {

        },
        table: {
            minWidth: 750,
        },
        tableWrapper: {
            overflowX: 'auto',
            margin: theme.spacing(3),
        },
        visuallyHidden: {

        },
        footerButton: {
            marginY: theme.spacing(3),
        }
    }),
);

function ShoppingCart() {
    const classes = useStyles({});

    const [isCheckout, setIsCheckout] = useState(true);

    function showCheckout() {
        setIsCheckout(true);
    }

    return (
        <Paper className={classes.paper}>

            {
                isCheckout ?
                <Checkout/>
                :
                <ShoppingCartItemList output={showCheckout}/>
            }



        </Paper >
    );
}

export default ShoppingCart;