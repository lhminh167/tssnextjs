import { Accordion, AccordionDetails, AccordionSummary, Breadcrumbs, createStyles, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { formatCurrency, formatDatetime } from '../../shared/helpers/string.helper';
import { bold, mb, p, textDanger, textSuccess, textWarning } from '../../shared/layout/layout.style';
import { defaultOrder, Order } from '../order.model';
import { getOrder } from '../order.service';
import ShipOkComponent from './ship-ok.component';
import StockOkComponent from './stock-ok.component';
import { ORDER_STATUS, ORDER_SUMMARY } from '../../shared/tag/tag.model';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bold: bold,
        p: p,
        mb: mb,
        textSuccess: textSuccess,
        textDanger: textDanger,
        textWarning: textWarning
    }),
);

interface Props {
    orderId: number;
}

export default function OrderDetailComponent({
    orderId
}: Props) {
    const classes = useStyles({});
    const [state, setState] = React.useState<Order>(defaultOrder);
    const [expanded, setExpanded] = useState<string | false>(false);

    useEffect(() => {
        if (orderId > 0)
            getOrder(orderId).then(data => {

                setState(data.content);
            })
    }, [orderId])

    const handleChange = (panel: string) => (event: ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Fragment>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize='small' />}
                className={classes.mb}
            >
                <Link
                    href='/'
                    passHref
                >
                    <Typography
                        component='a'
                        color='inherit'
                    >
                        Home
                    </Typography>
                </Link>
                <Link
                    href='/order'
                    passHref
                >
                    <Typography
                        component='a'
                        color='inherit'
                    >
                        Order
                    </Typography>
                </Link>
                <Typography
                    color='textPrimary'
                >
                    {orderId}
                </Typography>
            </Breadcrumbs>
            <Typography
                component='h1'
                variant='h4'
                className={classes.mb}
            >
                Order Details
            </Typography>
            {
                state.orderStatus.message === 'Awaiting stock confirmation'
                &&
                <Grid
                    container
                    component={Paper}
                    className={classes.p + ' ' + classes.mb}
                >
                    <StockOkComponent
                        data={state}
                        output={setState}
                    />
                </Grid>
            }
            {
                state.orderStatus.message === 'Awaiting shipment confirmation'
                &&
                <Grid
                    container
                    component={Paper}
                    className={classes.p + ' ' + classes.mb}
                >
                    <ShipOkComponent
                        data={state}
                        output={setState}
                    />
                </Grid>
            }
            <Accordion
                expanded={expanded === 'orderSummary'}
                onChange={handleChange('orderSummary')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography
                        component='h2'
                        data-cy={ORDER_SUMMARY}
                    >
                        Order Summary
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid
                        container
                    >
                        <Grid item xs={12} sm={6}>
                            <Typography
                                className={classes.bold}
                            >
                                Status
                            </Typography>
                            <Typography
                                className={classes[state.orderStatus.cssClass]}
                                data-cy={ORDER_STATUS}
                            >
                                {state.orderStatus.message}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                className={classes.bold}
                            >
                                Total Amount
                        </Typography>
                            <Typography
                            >
                                {formatCurrency(state.totalAmount)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                className={classes.bold}
                            >
                                Tax
                        </Typography>
                            <Typography
                            >
                                {state.tax.taxType}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                className={classes.bold}
                            >
                                Created On
                            </Typography>
                            <Typography
                            >
                                {formatDatetime(state.createdOn)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                className={classes.bold}
                            >
                                Shipping
                            </Typography>
                            <Typography >
                                {state.shipping.shippingType}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                className={classes.bold}
                            >
                                Comments
                        </Typography>
                            <Typography
                            >
                                {state.comments ?? 'No Comments'}
                            </Typography>
                        </Grid>
                    </Grid>

                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'orderItems'}
                onChange={handleChange('orderItems')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography
                    >
                        Order Items
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                                {state.orderDetail.map(row => (
                                    <TableRow key={row.itemId}>
                                        <TableCell component='th' scope='row'>
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
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'customer'}
                onChange={handleChange('customer')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography
                        component='h2'
                    >
                        Customer Details
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Full Name
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Email Address
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Mobile Phone Number
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.mobPhone}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                className={classes.bold}
                            >
                                Evening Phone Number
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.evePhone}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Day Phone Number
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.dayPhone}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Address Line 1
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.address1}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Address Line 2
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.address2}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                City
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.city}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Region
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.region}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Country
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.country}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}
                        >
                            <Typography
                                className={classes.bold}
                            >
                                Postal Code
                            </Typography>
                            <Typography
                                gutterBottom
                            >
                                {state.customer.postalCode}
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={3}>
                            <Typography >
                                Full Name
                            </Typography>
                            <Typography >
                                {state.customer.shippingRegion}
                            </Typography>
                        </Grid> */}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Accordion
                expanded={expanded === 'audit'}
                onChange={handleChange('audit')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography >
                        Audit
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                                {state.audit
                                    .sort((a, b) => {
                                        if (a.code === 10001) return -1;
                                        if (b.code === 10001) return 1;
                                        return b.code - a.code;
                                    })
                                    .map(row => (
                                        <TableRow key={row.auditId}>
                                            <TableCell component='th' scope='row'>
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
                </AccordionDetails>
            </Accordion>
        </Fragment>
    );
}