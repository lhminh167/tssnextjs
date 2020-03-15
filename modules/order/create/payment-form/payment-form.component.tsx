import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CreditCardComponent from './credit-card.component';
import { OrderCreateRequest } from '../create-order.model';

interface Props {
  data: OrderCreateRequest;
  back: any;
  next: any;
}

export default function PaymentFormComponent({
  data,
  back,
  next
}: Props) {
  return (
    <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
      <Elements>
        <CreditCardComponent
          data={data}
          next={next}
          back={back}
        />
      </Elements>
    </StripeProvider>
  );
}
