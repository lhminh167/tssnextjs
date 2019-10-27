import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import ShoppingCartItemList from './item-list/item-list.component';
import Checkout from '../checkout/checkout.component';
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

interface IProps {
    data: any;
}

function ShoppingCart(props: IProps) {
    const classes = useStyles({});
    const [isCheckout, setIsCheckout] = useState(true);
    const {data} = props;

    function showCheckout() {
        setIsCheckout(true);
    }

    return (
        <Paper className={classes.paper}>

                <ShoppingCartItemList data={data}/>



        </Paper >
    );
}

export default ShoppingCart;