import { createStyles, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Theme, Typography } from "@material-ui/core";
import next from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from 'swr';
import { IRootState } from "../../root/root.model";
import { callApi, getUrl } from "../../shared/crud/crud.service";
import { Customer, customerUrl, defaultCustomer, CreateCustomerRequestValidator } from "../customer.model";
import { getCustomer } from "../customer.service";
import { isValidForm } from "../../shared/validator/validator";
import { p } from "../../shared/layout/layout.style";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        p: p,
    })
);

interface Props {
    // data: OrderCreateRequest;
    userId: number;
}

export default function OrderCreateRequestComponent({
    // data,
    userId
}: Props) {
    const classes = useStyles({});
    const currentUser = useSelector<IRootState, Customer>(state => state.currentUser.data);
    const [state, setState] = useState<Customer>(defaultCustomer);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const shouldFetch: boolean = userId.toString() !== currentUser.customerId
        && currentUser.role === 'Admin';
    const { data, error } = useSWR(
        shouldFetch ? getUrl(customerUrl.baseUrl, userId) : null,
        {
            onSuccess: (data) => setState(data)
        }
    );
    const errors = new CreateCustomerRequestValidator().validate(state);

    useEffect(() => {
        if (!shouldFetch) setState(currentUser);
    }, []);

    function change(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setState({
            ...data,
            [name]: value
        });
    }

    async function submit() {
        setSubmitted(true);
        // if (isValidForm(errors))
        // next();
    }

    return (
        <Grid
            container
            item
            spacing={2}
            className={classes.p}
        // component={Paper}
        >
            {/* <Grid
                item
                xs={12}
            >
                <Typography component="h1" variant="h4" align="left">
                    Edit User
                </Typography>
            </Grid>
            <Grid item xs={12}
            >
                <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    fullWidth
                    autoComplete="name"
                    value={data.name}
                    onChange={change}
                    error={errors.name && submitted}
                    helperText={errors.name && submitted ? errors.name : null}
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
                    error={errors.address1 && submitted}
                    helperText={errors.address1 && submitted ? errors.address1 : null}
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
                    error={errors.address2 && submitted}
                    helperText={errors.address2 && submitted ? errors.address2 : null}
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
                    error={errors.city && submitted}
                    helperText={errors.city && submitted ? errors.city : null}
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
                    error={errors.region && submitted}
                    helperText={errors.region && submitted ? errors.region : null}
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
                    error={errors.postalCode && submitted}
                    helperText={errors.postalCode && submitted ? errors.postalCode : null}
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
                    error={errors.country && submitted}
                    helperText={errors.country && submitted ? errors.country : null}
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
                    {
                        errors.shippingRegionId && submitted &&
                        <FormHelperText
                            error
                        >
                            {errors.shippingRegionId}
                        </FormHelperText>
                    }
                </FormControl>
            </Grid> */}
        </Grid>

    );
}
