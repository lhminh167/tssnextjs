import { createStyles, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import ActionButtonsComponent from "../../../shared/action-buttons/action-buttons.component";
import { w100, p } from "../../../shared/layout/layout.style";
import { createOrder } from "../../order.service";

const useStyles = makeStyles(theme =>
    createStyles({
        w100: w100,
        p: p
    })
);

interface Props {
    data: any
    next: any;
    back: any;
}

export default function CreditCardComponent({
    data,
    next,
    back
}: Props) {
    debugger
    const classes = useStyles({});
    const stripe = useStripe();
    const elements = useElements();

    const submit = async (ev) => {
        // Block native form submission.
        ev.preventDefault();

        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        if (!stripe || !elements) return;

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: { name: "cardholderName.value" }
        });
        if (error?.message) return;

        const orderResponse = await createOrder({
            ...data,
            paymentMethodId: paymentMethod?.id
        });

        if (orderResponse.content.paymentStatus === 'requires_action') {
            const { error, paymentIntent } = await stripe.confirmCardPayment(orderResponse.content.paymentSecret);
            if (error?.message) return;
        }

        next(orderResponse.content);
    };

    return (
        <form
            className={classes.w100}
        >
            {/* <Typography variant="h6" gutterBottom>
                Payment method
            </Typography> */}
            <CardElement
                className={classes.p}
            />
            <Grid
                item
                container
                xs={12}
            >
                <ActionButtonsComponent
                    backButtonText={'Back'}
                    nextButtonText={'Next Step'}
                    back={back}
                    next={submit}
                    nextButtonDisabled={!stripe}
                />
            </Grid>
        </form>
    );

}
