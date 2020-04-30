import { createStyles, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { CardElement, injectStripe } from 'react-stripe-elements';
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
    stripe?: stripe.Stripe;
    elements?: stripe.elements.Elements;
    next: any;
    back: any;
}

function CreditCardComponent({
    data,
    stripe,
    elements,
    next,
    back
}: Props) {
    const classes = useStyles({});

    const submit = async (ev) => {
        ev.preventDefault();

        const paymentMethodResponse = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement('card'),
            billing_details: { name: "cardholderName.value" }
        });
        if (paymentMethodResponse?.error?.message) return;

        const orderResponse = await createOrder({
            ...data,
            paymentMethodId: paymentMethodResponse?.paymentMethod?.id
        });

        if (orderResponse.content.paymentStatus === 'requires_action') {
            const cardActionResponse = await stripe.confirmCardPayment(orderResponse.content.paymentSecret);
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
                />
            </Grid>
        </form>
    );

}
export default injectStripe(CreditCardComponent);
