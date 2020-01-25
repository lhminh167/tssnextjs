import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Router from 'next/router'
import React from 'react';
import ActionButtonsComponent from '../shared/action-buttons.component';

interface Props {
    back: any;
}

export default function FinishFormComponent({
    back,
}: Props) {
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Thank you for your order.
                </Typography>
            <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order confirmation, and will
                send you an update when your order has shipped.
                </Typography>
            <Grid item xs={12}>
                <ActionButtonsComponent
                    backButtonText={'Back'}
                    nextButtonText={'Back to Shop'}
                    back={back}
                    next={() => Router.push('/')}
                />
            </Grid>
        </React.Fragment>
    );
}
