import { Button, createStyles, FormControl, FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, TextField, Theme, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../root/root.model';
import { toNumber } from '../../shared/helpers/auth.helper';
import { mb, mb2, p } from '../../shared/layout/layout.style';
import { defaultCatalogGetRequest, defaultCatalogGetResponse, ICatalogGetResponse } from '../../shared/models/catalog.model';
import { getCatalog } from '../../shared/services/catalog.service';
import { ADDRESS_1, ADDRESS_2, CITY, COUNTRY, DAY_PHONE, EVE_PHONE, MOB_PHONE, NAME, POSTALCODE, REGION, ROLE, SHIPPING_REGION, SUBMIT } from '../../shared/tag/tag.model';
import { isValidForm } from '../../shared/validator/validator';
import { Customer, CustomerUpdateRequest, CustomerUpdateRequestValidator, defaultCustomerUpdateRequest } from '../customer.model';
import { getCustomer, updateCustomer } from '../customer.service';
import { currentUserSlice } from '../customer.slice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        p: p,
        mb: mb,
        mb2: mb2
    })
);

interface Props {
    userId: number;
}

export default function CustomerEditComponent({
    userId
}: Props) {
    const classes = useStyles({});
    const currentUser = useSelector<IRootState, Customer>(state => state.currentUser.data);
    const currentUserId = toNumber(currentUser.customerId);
    const [state, setState] = useState<CustomerUpdateRequest>(defaultCustomerUpdateRequest);
    const [form, setForm] = useState<ICatalogGetResponse>(defaultCatalogGetResponse);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const errors = new CustomerUpdateRequestValidator().validate(state);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {

        getCatalog({
            ...defaultCatalogGetRequest,
            shippingRegion: true,
            role: true
        }).then(res => {
            setForm(res.content);
        });

        if (currentUser.role === 'Admin' && userId !== currentUserId) {

            getCustomer(userId).then(res => {
                setState(res.content);
            });
        }
        else {
            const newState: CustomerUpdateRequest = {
                ...currentUser,
                shippingRegionId: currentUser.shippingRegion.shippingRegionId,
                customerId: toNumber(currentUser.customerId)
            };

            delete newState['shippingRegion'];

            setState(newState);
        }

    }, [currentUser.customerId])

    function change(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setState({
            ...state,
            [name]: value
        });
    }

    async function submit() {
        setSubmitted(true);
        if (!isValidForm(errors)) return;
        const response = await updateCustomer(state);

        if (userId === currentUserId)
            dispatch(currentUserSlice.actions.setCurrentUser({
                ...response.content,
                shippingRegion: form.shippingRegion.find(e => e.shippingRegionId === state.shippingRegionId)
            }));

        router.push(
            `/user/[userId]`,
            `/user/${userId}`
        );
    }

    return (
        <Grid
            container
            spacing={2}
            className={classes.p}
            component={Paper}
        >
            <Grid
                item
                xs={12}
            >
                <Typography
                    component='h1'
                    variant='h4'
                    align='left'
                >
                    Edit User
                </Typography>
            </Grid>
            <Grid item xs={12}
            >
                <TextField
                    required
                    id='name'
                    name='name'
                    label='Name'
                    fullWidth
                    autoComplete='name'
                    value={state.name}
                    onChange={change}
                    error={errors.name && submitted}
                    helperText={errors.name && submitted ? errors.name : null}
                    data-cy={NAME}

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
                    value={state.address1}
                    onChange={change}
                    error={errors.address1 && submitted}
                    helperText={errors.address1 && submitted ? errors.address1 : null}
                    data-cy={ADDRESS_1}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id='address2'
                    name='address2'
                    label='Address line 2'
                    fullWidth
                    autoComplete='billing address-line2'
                    value={state.address2}
                    onChange={change}
                    error={errors.address2 && submitted}
                    helperText={errors.address2 && submitted ? errors.address2 : null}
                    data-cy={ADDRESS_2}
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
                    value={state.city}
                    onChange={change}
                    error={errors.city && submitted}
                    helperText={errors.city && submitted ? errors.city : null}
                    data-cy={CITY}

                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id='region'
                    name='region'
                    label='State/Province/Region'
                    fullWidth
                    value={state.region}
                    onChange={change}
                    error={errors.region && submitted}
                    helperText={errors.region && submitted ? errors.region : null}
                    data-cy={REGION}

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
                    value={state.postalCode}
                    onChange={change}
                    error={errors.postalCode && submitted}
                    helperText={errors.postalCode && submitted ? errors.postalCode : null}
                    data-cy={POSTALCODE}
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
                    value={state.country}
                    onChange={change}
                    error={errors.country && submitted}
                    helperText={errors.country && submitted ? errors.country : null}
                    data-cy={COUNTRY}

                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id='dayPhone'
                    name='dayPhone'
                    label='Day Phone Number'
                    fullWidth
                    value={state.dayPhone}
                    onChange={change}
                    error={errors.dayPhone && submitted}
                    helperText={errors.dayPhone && submitted ? errors.dayPhone : null}
                    data-cy={DAY_PHONE}

                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id='evePhone'
                    name='evePhone'
                    label='Evening Phone Number'
                    fullWidth
                    value={state.evePhone}
                    onChange={change}
                    error={errors.evePhone && submitted}
                    helperText={errors.evePhone && submitted ? errors.evePhone : null}
                    data-cy={EVE_PHONE}

                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    id='mobPhone'
                    name='mobPhone'
                    label='Mobile Phone Number'
                    fullWidth
                    value={state.mobPhone}
                    onChange={change}
                    error={errors.mobPhone && submitted}
                    helperText={errors.mobPhone && submitted ? errors.mobPhone : null}
                    data-cy={MOB_PHONE}
                />
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
                        value={state.shippingRegionId}
                        onChange={change}
                        data-cy={SHIPPING_REGION}
                    >
                        {form.shippingRegion.map(entry => {
                            return (
                                <MenuItem
                                    key={entry.shippingRegionId}
                                    value={entry.shippingRegionId}
                                    data-cy={SHIPPING_REGION + entry.shippingRegionId}
                                >
                                    {entry.shippingRegion1}
                                </MenuItem>
                            )
                        })}
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
            {
                currentUser.role === 'Admin' &&
                <Grid item
                    xs={12} sm={6}
                >
                    <FormControl
                        fullWidth
                        error={errors.role && submitted}
                    >
                        <InputLabel
                            id='role'
                        >
                            Role
                    </InputLabel>
                        <Select
                            name='role'
                            labelId='role'
                            id='role'
                            value={state.role}
                            onChange={change}
                            data-cy={ROLE}
                        >
                            {form.role.map(entry => {
                                return (
                                    <MenuItem
                                        key={entry.value}
                                        value={entry.value}
                                        data-cy={ROLE + entry.value}
                                    >
                                        {entry.value}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                        {
                            errors.role && submitted &&
                            <FormHelperText
                                error
                            >
                                {errors.role}
                            </FormHelperText>
                        }
                    </FormControl>
                </Grid>
            }
            <Grid item
                xs={12}
                className={classes.mb}
            >
                <Button
                    type='button'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={submit}
                    data-cy={SUBMIT}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
}
