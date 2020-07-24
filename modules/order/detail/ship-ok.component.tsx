import { Button, createStyles, Grid, TextField, Theme, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState, Fragment } from 'react';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { defaultOrder, Order } from '../order.model';
import { getOrder, shipOk } from '../order.service';
import { mb, p } from '../../shared/layout/layout.style';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mb: mb,
        p: p
    }),
);

interface Props {
    data: Order;
}

export default function ShipOkComponent({
    data
}: Props) {
    const classes = useStyles({});
    const [state, setState] = React.useState<Order>(defaultOrder);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const { orderId } = router.query;

    useEffect(() => {
        if (state.orderId > 0) return;
        getOrder(Number(orderId)).then(data => {

            setState(data.content);
        })
    }, [])

    function openDialog() {
        setOpen(true);
    }

    function closeDialog() {
        setOpen(false);
    }

    function confirm() {
        setIsLoading(true);
        shipOk(state.orderId).then(data => {
            setState(data.content);
            setOpen(false);
            setIsLoading(false);
        })
    }

    function decline() {

    }


    function change(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    return (

        <Fragment>

            <Grid item xs={12}>
                <Typography
                    variant="h5"
                    component="h2"
                    className={classes.mb}
                >
                    Shipping Cofirmation
                    </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography >
                    Please proceed this order by confirming that shipment process was finished.
                    </Typography>
                <Typography >
                    Attention: By clicking the "Yes" button, this order proceeds to the next stage. You can then ship the goods to customer. Also, a notification email is sent to customer to notify this event.
                    </Typography>
                <Typography >
                    Attention: If you click "No" button, this order is cancelled and reverted back to a shopping cart, so that the customer can adjust their cart. Also, a notification email is sent to customer to notify this event.
                    </Typography>
                <TextField
                    multiline
                    name="comment"
                    variant="outlined"
                    margin="dense"
                    value={state.comments}
                    onChange={change}
                // error={errors.review1 && submitted}
                // helperText={errors.review1 && submitted ? errors.review1 : null}
                />
            </Grid>
            <Grid item xs={12}
            >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={openDialog}
                >
                    Confirm
                    </Button>
            </Grid>
            <ConfirmationDialog
                open={open}
                close={closeDialog}
                confirm={confirm}
                content="Are you sure that ?"
                decline={decline}
                isLoading={isLoading}
                confirmText="Confirm"
                declineText="Deciline"
            />
        </Fragment>
    );
}
