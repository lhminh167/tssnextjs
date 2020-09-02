import { Button, createStyles, Grid, TextField, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useState } from 'react';
import { ConfirmationDialog } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { mb, mr, p } from '../../shared/layout/layout.style';
import { CONFIRM_SHIPPING, SUBMIT, COMMENT } from '../../shared/tag/tag.model';
import { Order } from '../order.model';
import { shipNotOk, shipOk } from '../order.service';

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

export default function ShipOkComponent({
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

    // function openFailureDialog() {
    //     setIsSuccessful(false);
    //     setOpen(true);
    // }

    function closeDialog() {
        setOpen(false);
        setIsLoading(false);
    }

    function confirmSuccess() {
        setIsLoading(true);
        shipOk(state.orderId).then(data => {
            output(data.content);
            closeDialog();
        })
    }

    function confirmFailure() {
        setSubmitted(true);
        if (!state.comments) return;
        shipNotOk(state.orderId,
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
                <Typography variant='subtitle1'
                    data-cy={CONFIRM_SHIPPING}
                >
                    Please confirm the order has been shipped.
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
                    helperText={!state.comments && submitted && !isSuccessful ? 'Please specify the reasons for shipment incompleteness.' : null}
                    fullWidth
                    rows={4}
                    placeholder='If the shipment is incomplete, please specify the reasons for that.'
                    data-cy={COMMENT}
                />
            </Grid>
            <Grid item xs={12}
            >
                <Button
                    variant='contained'
                    color='primary'
                    onClick={openSuccessDialog}
                    className={classes.mr}
                    data-cy={SUBMIT}
                >
                    Yes, the order has been shipped
                </Button>
                {/* <Button
                    variant='outlined'
                    color='primary'
                    onClick={openFailureDialog}
                >
                    No, the shipment is incomplete
                </Button> */}
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
