import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Customer } from "../customer/customer.model";
import { IRootState } from "../root/root.model";
import { DeliveryForm } from "./checkout.model";
import { createOrder } from "./checkout.service";
import OrderConfirmationComponent from "./confirmation-form/confirmation-form.component";
import DeliveryFormComponent from "./delivery-form/delivery-form.component";
import FinishForm from "./finish-form/finish-form.component";
import PaymentFormComponent from "./payment-form/payment-form.component";
import { getCustomerId } from "../shared/helpers/auth.helper";

const useStyles = makeStyles(theme => createStyles({}));

const steps = [
  "Shipping address",
  "Payment details",
  "Review your order",
  "Finish"
];

interface ActiveStepProps {
  step: number;
  data: any;
  output: any;
  back: any;
  next: any;
}

function ActiveStepComponent({
  step,
  data,
  output,
  back,
  next
}: ActiveStepProps) {
  switch (step) {
    case 0:
      return <DeliveryFormComponent data={data} output={output} next={next} />;
    case 1:
      return (
        <PaymentFormComponent
          // data={data}
          // state={state}
          // output={setState}
          next={next}
          back={back}
        />
      );
    case 2:
      return (
        <OrderConfirmationComponent
          // data={data}
          // state={state}
          // output={setState}
          next={next}
          back={back}
        />
      );
    case 3:
      return <FinishForm back={back} />;
    default:
      throw new Error("Unknown step");
  }
}

interface CheckoutProps { }

export default function CheckoutComponent({ }: CheckoutProps) {
  const classes = useStyles({});
  const currentUser = useSelector(
    (state: IRootState) => state.currentUser.data
  );
  const defaultState: DeliveryForm = {
    ...currentUser,
    customerId: getCustomerId(currentUser.customerId),
    shippingId: 1
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, setState] = React.useState<DeliveryForm>(defaultState);

  useEffect(() => {
    setState(defaultState);
  }, [currentUser]);

  const next = async () => {
    setActiveStep(activeStep + 1);
    if (activeStep === 1) await submit();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const change = (input: DeliveryForm) => {
    setState(input);
  };

  const submit = async () => {
    // createOrder(state)
    //   .then(data => {
    //     debugger;
    //     // setState(data.content);
    //   })
    //   .catch(err => {});
  };

  return (
    <Paper>
      <Typography component="h1" variant="h4" align="left">
        Checkout
      </Typography>

      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <ActiveStepComponent
        step={activeStep}
        data={state}
        output={change}
        back={handleBack}
        next={next}
      />
    </Paper>
  );
}
