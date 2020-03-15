import { createOrder } from "../../order.service";
import { Typography } from "@material-ui/core";
import ActionButtonsComponent from "../shared/action-buttons.component";
import { CardElement, injectStripe } from 'react-stripe-elements';

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

        next();
    };

    return (
        <form>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <CardElement
            />
            <ActionButtonsComponent
                backButtonText={'Back'}
                nextButtonText={'Next Step'}
                back={back}
                next={submit}
            />
        </form>
    );

}
export default injectStripe(CreditCardComponent);
