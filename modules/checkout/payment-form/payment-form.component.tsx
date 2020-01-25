import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import next from 'next';
import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import ActionButtonsComponent from '../shared/action-buttons.component';
import CreditCardComponent from './credit-card.component';
import { CardElement } from 'react-stripe-elements';

interface Props {
  back: any;
  next: any;
}

export default function PaymentFormComponent({
  back,
  next
}: Props) {

  return (
    <React.Fragment>

      <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
        <Elements>
          <CreditCardComponent />
        </Elements>
      </StripeProvider>

      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Card number" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>

        <Grid item xs={12}>
          <ActionButtonsComponent
            backButtonText={'Back'}
            nextButtonText={'Next Step'}
            back={back}
            next={next}
          />
        </Grid>
      </Grid>

    </React.Fragment>
  );
}
