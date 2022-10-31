import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { OrderCreateRequest } from "../create-order.model";
import CreditCardComponent from "./credit-card.component";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY ?? "");

interface Props {
  data: OrderCreateRequest;
  back: any;
  next: any;
}

export default function PaymentFormComponent({ data, back, next }: Props) {
  return (
    <Elements stripe={stripePromise}>
      <CreditCardComponent data={data} next={next} back={back} />
    </Elements>
  );
}
