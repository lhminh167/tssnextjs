import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import Router from "next/router";
import { ChangeEvent, Fragment, useState } from "react";
import ActionButtonsComponent from "../../../shared/action-buttons/action-buttons.component";
import { p } from "../../../shared/layout/layout.style";
import {
  ADDRESS_1,
  ADDRESS_2,
  CITY,
  COUNTRY,
  DAY_PHONE,
  EVE_PHONE,
  MOB_PHONE,
  NAME,
  POSTALCODE,
  REGION,
  SHIPPING,
  SHIPPING_REGION,
} from "../../../shared/tag/tag.model";
import { isValidField, isValidForm } from "../../../shared/validator/validator";
import {
  OrderCreateForm,
  OrderCreateRequest,
  OrderCreateRequestValidator,
} from "../create-order.model";

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
  next,
}: Props) {
  const classes = useStyles({});
  const errors = new OrderCreateRequestValidator().validate(data);
  const [submitted, setSubmitted] = useState<boolean>(false);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const result = {
      ...data,
      [name]: value,
    };

    if (name === "shippingId")
      result.shippingRegionId = form.shippings.find(
        (e) => e.shippingId === value
      ).shippingRegionId;

    output(result);
  }

  function nextStep() {
    setSubmitted(true);
    if (isValidForm(errors)) next();
  }

  return (
    <Fragment>
      <Grid container item spacing={2} className={classes.p}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            value={data.name}
            onChange={change}
            error={isValidField(errors.name, submitted)}
            helperText={errors.name && submitted ? errors.name : null}
            data-cy={NAME}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            value={data.address1}
            onChange={change}
            error={isValidField(errors.address1, submitted)}
            helperText={errors.address1 && submitted ? errors.address1 : null}
            data-cy={ADDRESS_1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            value={data.address2}
            onChange={change}
            error={isValidField(errors.address2, submitted)}
            helperText={errors.address2 && submitted ? errors.address2 : null}
            data-cy={ADDRESS_2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            value={data.city}
            onChange={change}
            error={isValidField(errors.city, submitted)}
            helperText={errors.city && submitted ? errors.city : null}
            data-cy={CITY}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="region"
            name="region"
            label="State/Province/Region"
            fullWidth
            value={data.region}
            onChange={change}
            error={isValidField(errors.region, submitted)}
            helperText={errors.region && submitted ? errors.region : null}
            data-cy={REGION}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="postalCode"
            name="postalCode"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={data.postalCode}
            onChange={change}
            error={isValidField(errors.postalCode, submitted)}
            helperText={
              errors.postalCode && submitted ? errors.postalCode : null
            }
            data-cy={POSTALCODE}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={data.country}
            onChange={change}
            error={isValidField(errors.country, submitted)}
            helperText={errors.country && submitted ? errors.country : null}
            data-cy={COUNTRY}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="mobPhone"
            name="mobPhone"
            label="Mobile Phone"
            fullWidth
            autoComplete="phone"
            value={data.mobPhone}
            onChange={change}
            error={isValidField(errors.mobPhone, submitted)}
            helperText={errors.mobPhone && submitted ? errors.mobPhone : null}
            data-cy={MOB_PHONE}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="dayPhone"
            name="dayPhone"
            label="Day Phone"
            fullWidth
            autoComplete="phone"
            value={data.dayPhone}
            onChange={change}
            error={isValidField(errors.dayPhone, submitted)}
            helperText={errors.dayPhone && submitted ? errors.dayPhone : null}
            data-cy={DAY_PHONE}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="evePhone"
            name="evePhone"
            label="Evening Phone"
            fullWidth
            autoComplete="phone"
            value={data.evePhone}
            onChange={change}
            error={isValidField(errors.evePhone, submitted)}
            helperText={errors.evePhone && submitted ? errors.evePhone : null}
            data-cy={EVE_PHONE}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="shippingId">Shipping</InputLabel>
            <Select
              name="shippingId"
              labelId="shippingId"
              id="shippingId"
              value={data.shippingId}
              onChange={change}
              data-cy={SHIPPING}
            >
              {form.shippings.map((entry) => (
                <MenuItem
                  key={entry.shippingId}
                  value={entry.shippingId}
                  data-cy={SHIPPING + entry.shippingId}
                >
                  {entry.shippingType}
                </MenuItem>
              ))}
            </Select>
            {errors.shippingId && submitted && (
              <FormHelperText error>{errors.shippingId}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            error={isValidField(errors.shippingRegionId, submitted)}
          >
            <InputLabel id="shippingRegionId">Shipping Region</InputLabel>
            <Select
              name="shippingRegionId"
              labelId="shippingRegionId"
              id="shippingRegionId"
              value={data.shippingRegionId}
              onChange={change}
              disabled
              data-cy={SHIPPING_REGION}
            >
              {form.shippingRegions.map((entry) => (
                <MenuItem
                  key={entry.shippingRegionId}
                  value={entry.shippingRegionId}
                  data-cy={SHIPPING_REGION + entry.shippingRegionId}
                >
                  {entry.shippingRegion1}
                </MenuItem>
              ))}
            </Select>
            {errors.shippingRegionId && submitted && (
              <FormHelperText error>{errors.shippingRegionId}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <ActionButtonsComponent
          backButtonText={"Back to Your Cart"}
          nextButtonText={"Next Step"}
          back={() => Router.push("/shopping-cart")}
          next={nextStep}
        />
      </Grid>
    </Fragment>
  );
}
