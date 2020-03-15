import { OrderCreateRequest, OrderCreateForm, OrderCreateRequestValidator } from "../create-order.model";
import { Grid, Typography, TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import ActionButtonsComponent from "../shared/action-buttons.component";
import Router from "next/router";

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

  const errors = new OrderCreateRequestValidator().validate(data);

  function change(event) {

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    output({
      ...data,
      [name]: value
    });
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
      </Grid>
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
          error={errors.name !== null}
          helperText={errors.name ? errors.name : null}
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
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox color="secondary" name="saveAddress" value="yes" />
          }
          label="Use this address for payment details"
        />
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={6}>
          <FormControl
            fullWidth
          >
            <InputLabel
              id="shippingRegionId"
            >
              Shipping
              </InputLabel>
            <Select
              name="shippingId"
              labelId="shippingRegionId"
              id="shippingRegionId"
              value={data.shippingId}
              onChange={change}
            >
              {form.shippings.map(entry =>
                <MenuItem
                  key={entry.shippingId}
                  value={entry.shippingId}
                >
                  {entry.shippingType}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl
            fullWidth
          >
            <InputLabel
              id="shippingRegionId"
            >
              Shipping Region
              </InputLabel>
            <Select
              name="shippingRegionId"
              labelId="shippingRegionId"
              id="shippingRegionId"
              value={data.shippingRegionId}
              onChange={change}
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
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ActionButtonsComponent
          backButtonText={"Back to Your Cart"}
          nextButtonText={"Next Step"}
          back={() => Router.push("/shopping-cart")}
          next={next}
        />
      </Grid>
    </Grid>
  );
}
