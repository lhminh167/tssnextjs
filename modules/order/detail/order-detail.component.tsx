import { Breadcrumbs, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Grid, Fab, Button, Theme, createStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from "next/link";
import { useRouter } from 'next/router';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { defaultOrder, Order } from '../order.model';
import { getOrder } from '../order.service';
import { Alert, AlertTitle } from '@material-ui/lab';
import ClearIcon from "@material-ui/icons/Clear";
import StockOkComponent from './stock-ok.component';
import ShipOkComponent from './ship-ok.component';
import { formatCurrency, formatDatetime } from '../../shared/helpers/string.helper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: {
            fontWeight: 'bold'
        },
    }),
);

export default function OrderDetailComponent() {
    const classes = useStyles({});
    const [state, setState] = React.useState<Order>(defaultOrder);
    const [expanded, setExpanded] = useState<string | false>(false);
    const router = useRouter();
    const { orderId } = router.query;

    const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };


    useEffect(() => {
        if (state.orderId > 0) return;

        getOrder(Number(orderId)).then(data => {

            setState(data.content);
        })
    }, [])

    return (
        <Fragment>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
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
                        Order
                    </Typography>
                </Link>
                <Typography
                    color="textPrimary"
                >
                    {orderId}
                </Typography>
            </Breadcrumbs>
            {
                state.orderStatus.id === 4
                &&
                <StockOkComponent
                    data={state}
                />
            }
            {
                state.orderStatus.id === 7
                &&
                <ShipOkComponent
                    data={state}
                />
            }

            <Grid
                container
                component={Paper}
            >
                <Grid item xs={12}>
                    <Typography
                        variant="h5"
                        component="h1"
                    >
                        Order Summary
                        </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle2"
                        component="label"
                        className={classes.bold}
                    >
                        Status
                        </Typography>
                    <Typography
                        variant="subtitle1"
                        component="p"
                    >
                        {state.orderStatus?.message}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle2"
                        component="label"
                        className={classes.bold}
                    >
                        Total Amount
                        </Typography>
                    <Typography
                        variant="subtitle1"
                        component="p"
                    >
                        {formatCurrency(state.totalAmount)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle2"
                        component="label"
                        className={classes.bold}
                    >
                        Tax
                        </Typography>
                    <Typography
                        variant="subtitle1"
                        component="p"
                    >
                        {state.tax?.taxType}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle2"
                        component="label"
                        className={classes.bold}
                    >
                        Created On
                            </Typography>
                    <Typography
                        variant="subtitle1"
                        component="p"
                    >
                        {formatDatetime(state.createdOn)}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle2"
                        component="label"
                        className={classes.bold}
                    >
                        Shipping
                            </Typography>
                    <Typography >
                        {state.shipping?.shippingType}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography
                        variant="subtitle2"
                        component="label"
                        className={classes.bold}
                    >
                        Comments
                        </Typography>
                    <Typography
                        variant="subtitle1"
                        component="p"
                    >
                        {state.comments ?? 'No Comments'}
                    </Typography>
                </Grid>
            </Grid>
            <ExpansionPanel
                expanded={expanded === 'orderDetail'}
                onChange={handleChange('orderDetail')}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography >
                        Order Details
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TableContainer>
                        <Table
                            size='small'
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item ID</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Attributes</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Unit Cost (USD)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state?.orderDetail?.map(row => (
                                    <TableRow key={row.itemId}>
                                        <TableCell component="th" scope="row">
                                            {row.itemId}
                                        </TableCell>
                                        <TableCell>{row.productName}</TableCell>
                                        <TableCell>{row.attributes}</TableCell>
                                        <TableCell>{row.quantity}</TableCell>
                                        <TableCell>{row.unitCost}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === 'customer'}
                onChange={handleChange('customer')}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography >
                        Customer Details
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Typography
                            >
                                Full Name
                            </Typography>
                            <Typography >
                                {state.customer?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Email Address
                            </Typography>
                            <Typography >
                                {state.customer?.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Mobile Phone Number
                            </Typography>
                            <Typography >
                                {state.customer?.mobPhone}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Evening Phone Number
                            </Typography>
                            <Typography >
                                {state.customer?.evePhone}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Day Phone Number
                            </Typography>
                            <Typography >
                                {state.customer?.dayPhone}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Address Line 1
                            </Typography>
                            <Typography >
                                {state.customer?.address1}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Address Line 2
                            </Typography>
                            <Typography >
                                {state.customer?.address2}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                City
                            </Typography>
                            <Typography >
                                {state.customer?.city}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Region
                            </Typography>
                            <Typography >
                                {state.customer?.region}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Country
                            </Typography>
                            <Typography >
                                {state.customer?.country}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography >
                                Postal Code
                            </Typography>
                            <Typography >
                                {state.customer?.postalCode}
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={3}>
                            <Typography >
                                Full Name
                            </Typography>
                            <Typography >
                                {state.customer?.shippingRegion}
                            </Typography>
                        </Grid> */}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
                expanded={expanded === 'audit'}
                onChange={handleChange('audit')}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography >
                        Audit
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <TableContainer>
                        <Table
                            size='small'
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Audit ID</TableCell>
                                    <TableCell>Message</TableCell>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Created On</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state?.audit
                                    .sort((a, b) => {
                                        if (a.code === 10001) return -1;
                                        if (b.code === 10001) return 1;
                                        return b.code - a.code;
                                    })
                                    .map(row => (
                                        <TableRow key={row.auditId}>
                                            <TableCell component="th" scope="row">
                                                {row.auditId}
                                            </TableCell>
                                            <TableCell>{row.message}</TableCell>
                                            <TableCell>{row.code}</TableCell>
                                            <TableCell>{
                                                row.createdOn ?
                                                    new Date(row.createdOn).toString() :
                                                    null
                                            }</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Fragment>
    );
}