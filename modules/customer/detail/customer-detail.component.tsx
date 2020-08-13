import { Breadcrumbs, createStyles, Grid, Theme, Typography, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "next/link";
import React, { Fragment, useEffect, useState } from 'react';
import { bold, p, mb } from '../../shared/layout/layout.style';
import { Customer, defaultCustomer } from '../customer.model';
import { getCustomer } from '../customer.service';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: bold,
        p: p,
        mb: mb
    }),
);

export default function CustomerDetailComponent({
    userId
}) {
    const classes = useStyles({});
    const [state, setState] = useState<Customer>(defaultCustomer);

    useEffect(() => {
        getCustomer(userId).then(data => {
            setState(data.content);
        })
    }, [])

    return (
        <Fragment>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                className={classes.mb}
            >
                <Link
                    href="/"
                    passHref
                >
                    <Typography
                        component="a"
                        color="inherit"
                    >
                        Home
                    </Typography>
                </Link>
                <Link
                    href="/order"
                    passHref
                >
                    <Typography
                        component="a"
                        color="inherit"
                    >
                        Customer
                    </Typography>
                </Link>
                <Typography
                    color="textPrimary"
                >
                    Customer Details
                </Typography>
            </Breadcrumbs>
            <Grid
                container
                xs={12}
                component={Paper}
                className={classes.p}
            >
                <Grid item xs={12}
                    className={classes.mb}

                >
                    <Typography
                        component='h1'
                        variant='h5'
                    >
                        Customer Details
                </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        Full Name
                    </Typography>
                    <Typography >
                        {state.name}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        Email Address
                            </Typography>
                    <Typography >
                        {state.email}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}
                >
                    <Typography
                        className={classes.bold}

                    >
                        Mobile Phone Number
                            </Typography>
                    <Typography >
                        {state.mobPhone}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        Evening Phone Number
                            </Typography>
                    <Typography >
                        {state.evePhone}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        Day Phone Number
                            </Typography>
                    <Typography >
                        {state.dayPhone}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        Address Line 1
                            </Typography>
                    <Typography >
                        {state.address1}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        className={classes.bold}

                    >
                        Address Line 2
                            </Typography>
                    <Typography >
                        {state.address2}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        City
                            </Typography>
                    <Typography >
                        {state.city}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        Region
                            </Typography>
                    <Typography >
                        {state.region}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        Country
                            </Typography>
                    <Typography >
                        {state.country}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}

                >
                    <Typography
                        className={classes.bold}

                    >
                        Postal Code
                            </Typography>
                    <Typography >
                        {state.postalCode}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}
                >
                    <Typography
                        className={classes.bold}

                    >
                        Shipping Region
                            </Typography>
                    <Typography >
                        {state.shippingRegion.shippingRegion1}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}
                    className={classes.mb}
                >
                    <Typography
                        className={classes.bold}
                    >
                        Role
                    </Typography>
                    <Typography >
                        {state.role}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Link
                        href={{
                            pathname: '/user/[userId]/edit'
                        }}
                        as={`/user/${userId}/edit`}
                        passHref
                    >
                        <Button
                            component='a'
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Edit
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Fragment>
    );
}