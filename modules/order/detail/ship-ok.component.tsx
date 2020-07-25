import { Button, Grid, Typography, Theme, createStyles, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import React, { useEffect, useState, Fragment } from 'react';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { defaultOrder, Order } from '../order.model';
import { getOrder, shipNotOk, shipOk } from '../order.service';
import { mb, p, mr } from '../../shared/layout/layout.style';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mb: mb,
        p: p,
        mr: mr
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
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    const router = useRouter();
    const { orderId } = router.query;

    useEffect(() => {
        if (state.orderId > 0) return;
        getOrder(Number(orderId)).then(data => {
            setState(data.content);
        })
    }, [])

    function openSuccessDialog() {
        setIsSuccessful(true);
        setOpen(true);
    }

    function openFailureDialog() {
        setIsSuccessful(false);
        setOpen(true);
    }

    function closeDialog() {
        setOpen(false);
    }

    function confirmSuccess() {
        setIsLoading(true);
        shipOk(state.orderId).then(data => {
            setOpen(false);
            setIsLoading(false);
        })
    }

    function confirmFailure() {
        setSubmitted(true);
        if (!state.comments) return;
        shipNotOk(state.orderId, {
            comments: state.comments
        }).then(data => {
            setOpen(false);
            setIsLoading(false);
        })
    }

    function change(event) {
        const target = event.target;
        setState({
            ...state,
            [target.name]: target.value
        });
    }

    return (
        <Fragment>
            <Grid item xs={12}
                className={classes.mb}
            >
                <Typography
                    variant="h5"
                    component="h2"
                >
                    Order Confirmation
                </Typography>
            </Grid>
            <Grid item xs={12}
                className={classes.mb}
            >
                <Typography variant='subtitle1'>
                    Please confirm the order has been shipped.
                </Typography>
            </Grid>
            <Grid item xs={12}
                className={classes.mb}
            >
                <TextField
                    multiline
                    name="comments"
                    variant="outlined"
                    margin="dense"
                    value={state.comments}
                    onChange={change}
                    error={!state.comments && submitted}
                    helperText={!state.comments && submitted && !isSuccessful ? 'Please specify the reasons for shipment incompleteness.' : null}
                    fullWidth
                    rows={4}
                    placeholder="If the shipment is in complete, please specify the reasons for that."
                />
            </Grid>
            <Grid item xs={12}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={openSuccessDialog}
                    className={classes.mr}
                >
                    Yes, the order has been shipped
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={openFailureDialog}
                >
                    No, the shipment is incomplete
                </Button>
            </Grid>
            <ConfirmationDialog
                open={open}
                close={null}
                confirm={isSuccessful ? confirmSuccess : confirmFailure}
                content={"Please confirm this action by clicking the Submit button"}
                decline={closeDialog}
                isLoading={isLoading}
                confirmText="Submit"
                declineText="Close"
            />
        </Fragment >
    );
}
