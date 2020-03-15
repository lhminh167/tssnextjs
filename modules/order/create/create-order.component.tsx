import { createStyles, makeStyles, Paper, Step, StepLabel, Stepper, Theme, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../root/root.model";
import { toNumber } from "../../shared/helpers/auth.helper";
import { getOrderCreateForm } from "../order.service";
import OrderConfirmationComponent from "./confirmation-form/confirmation-form.component";
import OrderCreateRequestComponent from "./delivery-form/delivery-form.component";
import FinishFormComponent from "./finish-form/finish-form.component";
import { defaultOrderCreateForm, OrderCreateForm, OrderCreateRequest } from "./create-order.model";
import PaymentFormComponent from "./payment-form/payment-form.component";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

const steps = [
    "Delivery",
    "Confirmation",
    "Payment",
    "Finish"
];

interface ActiveStepProps {
    step: number;
    data: OrderCreateRequest;
    form: OrderCreateForm;
    output: any;
    back: any;
    next: any;
}

function ActiveStepComponent({
    step,
    data,
    form,
    output,
    back,
    next
}: ActiveStepProps) {
    switch (step) {
        case 0:
            return <OrderCreateRequestComponent
                data={data}
                form={form}
                output={output}
                next={next}
            />;
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
            return (
                <PaymentFormComponent
                    data={data}
                    next={next}
                    back={back}
                />
            );
        case 3:
            return <FinishFormComponent back={back} />;
        default:
            throw new Error("Unknown step");
    }
}

export default function NewOrderComponent() {
    const classes = useStyles({});
    const currentUser = useSelector(
        (state: IRootState) => state.currentUser.data
    );
    const defaultOrderCreateRequest: OrderCreateRequest = {
        shippingId: 1,
        shippingRegionId: 2,
        ...currentUser,
        customerId: toNumber(currentUser.customerId),
    };
    const [activeStep, setActiveStep] = React.useState(0);
    const [state, setState] = React.useState<OrderCreateRequest>(defaultOrderCreateRequest);
    const [form, setForm] = React.useState<OrderCreateForm>(defaultOrderCreateForm);

    useEffect(() => {
        getOrderCreateForm().then(data => {
            setForm(data.content);
        });
    }, []);

    useEffect(() => {
        setState(defaultOrderCreateRequest);
    }, [currentUser]);

    const next = async () => {
        setActiveStep(activeStep + 1);
    };

    const back = () => {
        setActiveStep(activeStep - 1);
    };

    const change = (input: OrderCreateRequest) => {

        setState(input);
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
                form={form}
                output={change}
                back={back}
                next={next}
            />
        </Paper>
    );
}
