import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, makeStyles, Theme, createStyles, FormHelperText } from '@material-ui/core';
import Router from 'next/router';
import ActionButtonsComponent from '../../../shared/action-buttons/action-buttons.component';
import { OrderCreateForm, OrderCreateRequest, OrderCreateRequestValidator } from '../create-order.model';
import { Fragment, useState } from 'react';
import { p } from '../../../shared/layout/layout.style';
import { isValidForm } from '../../../shared/validator/validator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    p: p,
  })
);

interface Props {
  data: OrderCreateRequest;
  form: OrderCreateForm;
  output: any;
  next: any;
}

export default function OrderCreateRequestComponent({
  data,
  form,
  output,
  next
}: Props) {
  const classes = useStyles({});
  const errors = new OrderCreateRequestValidator().validate(data);
  const [submitted, setSubmitted] = useState<boolean>(false);

  function change(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const result = {
      ...data,
      [name]: value
    }

    if (name === 'shippingId')
      result.shippingRegionId = form.shippings.find(e => e.shippingId === value).shippingRegionId;

    output(result);
  }

  function nextStep() {

    setSubmitted(true);
    if (isValidForm(errors)) next();
  }

  return (
    <Fragment>
      <Grid
        container
        item
        spacing={2}
        className={classes.p}
      >
        <Grid item xs={12}
        >
          <TextField
            required
            id='name'
            name='name'
            label='Name'
            fullWidth
            autoComplete='name'
            value={data.name}
            onChange={change}
            error={errors.name && submitted}
            helperText={errors.name && submitted ? errors.name : null}
            data-cy='name'

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='address1'
            name='address1'
            label='Address line 1'
            fullWidth
            autoComplete='billing address-line1'
            value={data.address1}
            onChange={change}
            error={errors.address1 && submitted}
            helperText={errors.address1 && submitted ? errors.address1 : null}
            data-cy='address1'

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='address2'
            name='address2'
            label='Address line 2'
            fullWidth
            autoComplete='billing address-line2'
            value={data.address2}
            onChange={change}
            error={errors.address2 && submitted}
            helperText={errors.address2 && submitted ? errors.address2 : null}
            data-cy='address2'

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='city'
            name='city'
            label='City'
            fullWidth
            autoComplete='billing address-level2'
            value={data.city}
            onChange={change}
            error={errors.city && submitted}
            helperText={errors.city && submitted ? errors.city : null}
            data-cy='city'

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='region'
            name='region'
            label='State/Province/Region'
            fullWidth
            value={data.region}
            onChange={change}
            error={errors.region && submitted}
            helperText={errors.region && submitted ? errors.region : null}
            data-cy='region'

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='postalCode'
            name='postalCode'
            label='Zip / Postal code'
            fullWidth
            autoComplete='billing postal-code'
            value={data.postalCode}
            onChange={change}
            error={errors.postalCode && submitted}
            helperText={errors.postalCode && submitted ? errors.postalCode : null}
            data-cy='postalCode'

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='country'
            name='country'
            label='Country'
            fullWidth
            autoComplete='billing country'
            value={data.country}
            onChange={change}
            error={errors.country && submitted}
            helperText={errors.country && submitted ? errors.country : null}
            data-cy='country'

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='mobPhone'
            name='mobPhone'
            label='Mobile Phone'
            fullWidth
            autoComplete='phone'
            value={data.mobPhone}
            onChange={change}
            error={errors.mobPhone && submitted}
            helperText={errors.mobPhone && submitted ? errors.mobPhone : null}
            data-cy='mobPhone'

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='dayPhone'
            name='dayPhone'
            label='Day Phone'
            fullWidth
            autoComplete='phone'
            value={data.dayPhone}
            onChange={change}
            error={errors.dayPhone && submitted}
            helperText={errors.dayPhone && submitted ? errors.dayPhone : null}
            data-cy='dayPhone'

          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id='evePhone'
            name='evePhone'
            label='Evening Phone'
            fullWidth
            autoComplete='phone'
            value={data.evePhone}
            onChange={change}
            error={errors.evePhone && submitted}
            helperText={errors.evePhone && submitted ? errors.evePhone : null}
            data-cy='evePhone'

          />
        </Grid>
        <Grid item
          xs={12}
          sm={6}
        >
          <FormControl
            fullWidth
          >
            <InputLabel
              id='shippingId'
            >
              Shipping
              </InputLabel>
            <Select
              name='shippingId'
              labelId='shippingId'
              id='shippingId'
              value={data.shippingId}
              onChange={change}
              data-cy='shippingId'
            >
              {form.shippings.map(entry =>
                <MenuItem
                  key={entry.shippingId}
                  value={entry.shippingId}
                  data-cy={'shippingId' + entry.shippingId}
                >
                  {entry.shippingType}
                </MenuItem>
              )}
            </Select>
            {
              errors.shippingId && submitted &&
              <FormHelperText
                error
              >
                {errors.shippingId}
              </FormHelperText>
            }
          </FormControl>
        </Grid>
        <Grid item
          xs={12} sm={6}
        >
          <FormControl
            fullWidth
            error={errors.shippingRegionId && submitted}
          >
            <InputLabel
              id='shippingRegionId'
            >
              Shipping Region
              </InputLabel>
            <Select
              name='shippingRegionId'
              labelId='shippingRegionId'
              id='shippingRegionId'
              value={data.shippingRegionId}
              onChange={change}
              disabled
              data-cy='shippingRegionId'
            >
              {form.shippingRegions.map(entry =>
                <MenuItem
                  key={entry.shippingRegionId}
                  value={entry.shippingRegionId}
                >
                  {entry.shippingRegion1}
                </MenuItem>
              )}
            </Select>
            {
              errors.shippingRegionId && submitted &&
              <FormHelperText
                error
              >
                {errors.shippingRegionId}
              </FormHelperText>
            }
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
      >
        <ActionButtonsComponent
          backButtonText={'Back to Your Cart'}
          nextButtonText={'Next Step'}
          back={() => Router.push('/shopping-cart')}
          next={nextStep}
        />
      </Grid>
    </Fragment >
  );
}
