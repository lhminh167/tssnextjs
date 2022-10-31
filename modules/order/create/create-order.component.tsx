import {
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { defaultCustomer } from "../../customer/customer.model";
import { IRootState } from "../../root/root.model";
import { toNumber } from "../../shared/helpers/auth.helper";
import { p, pl0, pr0 } from "../../shared/layout/layout.style";
import { isSmallWidth } from "../../shared/layout/layout.theme";
import { defaultShipping } from "../../shared/models/shipping.model";
import { defaultOrder, Order } from "../order.model";
import { getOrderCreateForm } from "../order.service";
import OrderConfirmationComponent from "./confirmation-form/confirmation-form.component";
import {
  defaultOrderCreateForm,
  OrderCreateForm,
  OrderCreateRequest,
} from "./create-order.model";
import OrderCreateRequestComponent from "./delivery-form/delivery-form.component";
import FinishFormComponent from "./finish-form/finish-form.component";
import PaymentFormComponent from "./payment-form/payment-form.component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pl0: pl0,
    pr0: pr0,
    p: p,
  })
);

const steps = ["Delivery", "Confirmation", "Payment", "Finish"];

interface ActiveStepProps {
  step: number;
  data: OrderCreateRequest;
  form: OrderCreateForm;
  order: Order;
  output: any;
  back: any;
  next: any;
}

function ActiveStepComponent({
  step,
  data,
  form,
  order,
  output,
  back,
  next,
}: ActiveStepProps) {
  switch (step) {
    case 0:
      return (
        <OrderCreateRequestComponent
          data={data}
          form={form}
          output={output}
          next={next}
        />
      );
    case 1:
      return (
        <OrderConfirmationComponent
          data={data}
          form={form}
          next={next}
          back={back}
        />
      );
    case 2:
      return <PaymentFormComponent data={data} next={next} back={back} />;
    case 3:
      return <FinishFormComponent data={order} back={back} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function CreateOrderComponent() {
  const matches = isSmallWidth();
  const classes = useStyles({});
  const currentUser = useSelector(
    (state: IRootState) => state.currentUser.data
  );
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, setState] = React.useState<OrderCreateRequest>({
    ...defaultCustomer,
    customerId: toNumber(defaultCustomer.customerId),
    shippingId: 1,
    shippingRegionId: 2,
  });
  const [form, setForm] = React.useState<OrderCreateForm>(
    defaultOrderCreateForm
  );
  const [order, setOrder] = React.useState<Order>(defaultOrder);

  useEffect(() => {
    getOrderCreateForm().then((data) => {
      const formResponse = data.content ?? defaultOrderCreateForm;
      const shipping =
        formResponse.shippings.find(
          (e) =>
            e.shippingRegion.shippingRegionId === currentUser.shippingRegionId
        ) ?? defaultShipping;
      setForm(formResponse);
      setState({
        ...currentUser,
        customerId: toNumber(currentUser.customerId),
        shippingId: shipping.shippingId,
        shippingRegionId: currentUser.shippingRegion.shippingRegionId,
      });
    });
  }, [currentUser]);

  const next = async (order: Order = null) => {
    if (order) setOrder(order);
    setActiveStep(activeStep + 1);
  };

  const back = () => {
    setActiveStep(activeStep - 1);
  };

  const change = (input: OrderCreateRequest) => {
    setState(input);
  };

  return (
    <Grid container component={Paper}>
      <Grid item xs={12} className={classes.p}>
        <Typography component="h1" variant="h4" align="left">
          Checkout
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.p}>
        <Stepper
          activeStep={activeStep}
          className={classes.pl0 + " " + classes.pr0}
          orientation={matches ? "horizontal" : "vertical"}
        >
          {steps.map((label, index) => (
            <Step
              key={label}
              className={
                (index === 0 ? classes.pl0 + " " : "") +
                (index === steps.length - 1 ? classes.pr0 : "")
              }
            >
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>

      <ActiveStepComponent
        step={activeStep}
        data={state}
        form={form}
        output={change}
        back={back}
        next={next}
        order={order}
      />
    </Grid>
  );
}
