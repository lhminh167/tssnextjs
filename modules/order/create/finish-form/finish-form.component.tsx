import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router'
import React from 'react';
import ActionButtonsComponent from '../shared/action-buttons.component';
import Link from 'next/link';
import Fab from '@material-ui/core/Fab';

interface Props {
    back: any;
}

export default function FinishFormComponent({
    back,
}: Props) {
    return (
        <Grid container>
            <Typography variant="h5" gutterBottom>
                Thank you for your order.
                </Typography>
            <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order confirmation, and will
                send you an update when your order has shipped.
                </Typography>
            <Grid item xs={12}>
                <Link
                    href="/"
                    as="/"
                    passHref
                >
                    <Fab
                        component="a"
                        variant="extended"
                        color="primary"
                    >
                        Back to Shop
                    </Fab>
                </Link>
            </Grid>
        </Grid>
    );
}
