import { Button, createStyles, Grid, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useState } from 'react';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { mb, mr, p } from '../../shared/layout/layout.style';
import { Order } from '../order.model';
import { stockNotOk, stockOk } from '../order.service';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        mb: mb,
        p: p,
        mr: mr
    }),
);

interface Props {
    data: Order;
    output: any;
}

export default function StockOkComponent({
    data,
    output
}: Props) {
    const classes = useStyles({});
    const [state, setState] = React.useState<Order>(data);
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

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
        setIsLoading(false);
    }

    function confirmSuccess() {
        setIsLoading(true);
        stockOk(state.orderId).then(data => {
            output(data.content);
            closeDialog();
        })
    }

    function confirmFailure() {
        setSubmitted(true);
        if (!state.comments) return;
        stockNotOk(state.orderId,
            state.comments
        ).then(data => {
            output(data.content);
            closeDialog();
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
                    variant='h5'
                    component='h2'
                >
                    Order Confirmation
                </Typography>
            </Grid>
            <Grid item xs={12}
                className={classes.mb}
            >
                <Typography variant='subtitle1'>
                    Please proceed this order by confirming that all of its products are in stock. Also, please specify which products are out of stock, if any. For example:
                </Typography>
            </Grid>
            <Grid item xs={12}
                className={classes.mb}
            >
                <Typography variant='subtitle2'>
                    The following products are out of stock:
                </Typography>
                <Typography variant='subtitle2'>
                    - Green XL Birds T-Shirt. Required Quantity: 10. Available Quantity: 09.
                </Typography>
                <Typography variant='subtitle2'>
                    - Blue L Wreath T-Shirt. Required Quantity: 05. Available Quantity: 02.
                </Typography>
                <Typography variant='subtitle2'>
                    - etc.
                </Typography>
            </Grid>
            <Grid item xs={12}
                className={classes.mb}
            >
                <TextField
                    multiline
                    name='comments'
                    variant='outlined'
                    margin='dense'
                    value={state.comments}
                    onChange={change}
                    error={!state.comments && submitted}
                    helperText={!state.comments && submitted && !isSuccessful ? 'Please specify which products are out of stock.' : null}
                    fullWidth
                    rows={4}
                // placeholder='The following products are out of stock:&#10;- Green XL Birds T-Shirt. Required Quantity: 10. Avalable Quantity: 09.&#10;- Blue L Wreath T-Shirt. Required Quantity: 05. Avalable Quantity: 02.&#10;- etc.'
                />
            </Grid>
            <Grid item xs={12}
            >
                <Button
                    variant='contained'
                    color='primary'
                    onClick={openSuccessDialog}
                    className={classes.mr}
                >
                    Yes, they are all in stock
                </Button>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={openFailureDialog}
                >
                    No, some of them are out of stock
                </Button>
            </Grid>
            <ConfirmationDialog
                open={open}
                close={null}
                confirm={isSuccessful ? confirmSuccess : confirmFailure}
                content={'Please confirm this action by clicking the Submit button'}
                decline={closeDialog}
                isLoading={isLoading}
                confirmText='Submit'
                declineText='Close'
            />
        </Fragment >
    );
}
