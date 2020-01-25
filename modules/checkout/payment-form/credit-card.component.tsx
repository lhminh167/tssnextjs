import { CardElement, injectStripe } from 'react-stripe-elements';
import { useSelector } from 'react-redux';
import { IRootState } from '../../root/root.model';
import { DeliveryForm } from '../checkout.model';
import { getCustomerId } from '../../shared/helpers/auth.helper';
import React, { useEffect } from 'react';
import { createOrder } from '../checkout.service';
// import { stripe. } from 'stripe';

interface Props {
    stripe: any;
    elements: any;
}

function CreditCardComponent({
    stripe,
    elements
}: Props) {
    const currentUser = useSelector(
        (state: IRootState) => state.currentUser.data
    );
    const defaultState: DeliveryForm = {
        ...currentUser,
        customerId: getCustomerId(currentUser.customerId),
        shippingId: 1
    };
    const [state, setState] = React.useState<DeliveryForm>(defaultState);
    useEffect(() => {
        setState(defaultState);
    }, [currentUser]);



    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const paymentMethod = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement('card'),
            billing_details: { name: "cardholderName.value" }
        });
        debugger
        const order = await createOrder({ ...state, paymentMethodId: paymentMethod.paymentMethod.id });
        debugger
    };


    return (
        <form onSubmit={handleSubmit}>

            <CardElement
            />
            <button>Confirm order</button>

        </form>

    );

}
export default injectStripe(CreditCardComponent);
