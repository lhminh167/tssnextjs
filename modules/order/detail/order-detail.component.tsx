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
import { COMMENT, ORDER, STATUS, ORDER_SUMMARY, tag, ADDRESS_1, ADDRESS_2, CITY, COUNTRY, NAME, POSTALCODE, REGION, EMAIL, ID, ITEM, DISCOUNTED_PRICE, QUANTITY, AUDIT, DATETIME, DESCRIPTION, GRAND_TOTAL, SHIPPING, TAX, EVE_PHONE, DAY_PHONE, MOB_PHONE } from '../../shared/tag/tag.model';
import { getCustomerRoleFromLoginToken, goTo } from '../../shared/helpers/auth.helper';
import { Role } from '../../customer/customer.model';
import { isOk } from '../../shared/helpers/http.helper';

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
    const isAdmin: boolean = getCustomerRoleFromLoginToken() === Role.Admin;

    useEffect(() => {
        if (orderId > 0)
            getOrder(orderId).then(data => {
                if (!isOk(data.status)) {
                    goTo('/');
                    return;
                }
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
                    data-cy={tag(ID, '', ORDER)}
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
                isAdmin
                &&
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
                isAdmin
                &&
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
                                data-cy={tag(ORDER, '', STATUS)}
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
                                data-cy={GRAND_TOTAL}
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
                                data-cy={TAX}
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
                                data-cy={DATETIME}
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
                            <Typography
                                data-cy={SHIPPING}
                            >
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
                                data-cy={tag(ORDER_SUMMARY, '', COMMENT)}
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
                                    <TableRow
                                        key={row.itemId}
                                        data-cy={tag(ITEM, row.itemId, ORDER)}
                                    >
                                        <TableCell component='th' scope='row'>
                                            <Typography
                                                component='span'
                                                data-cy={ID}
                                            >
                                                {row.itemId}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                component='span'
                                                data-cy={NAME}
                                            >
                                                {row.productName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                component='span'
                                            >
                                                {row.attributes}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                component='span'
                                                data-cy={QUANTITY}
                                            >
                                                {row.quantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                component='span'
                                                data-cy={DISCOUNTED_PRICE}
                                            >
                                                {row.unitCost}
                                            </Typography>
                                        </TableCell>
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
                                data-cy={NAME}
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
                                data-cy={EMAIL}
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
                                data-cy={MOB_PHONE}
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
                                data-cy={EVE_PHONE}
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
                                data-cy={DAY_PHONE}
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
                                data-cy={ADDRESS_1}
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
                                data-cy={ADDRESS_2}
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
                                data-cy={CITY}
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
                                data-cy={REGION}
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
                                data-cy={COUNTRY}
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
                                data-cy={POSTALCODE}
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
                                        <TableRow
                                            key={row.auditId}
                                            data-cy={tag(ITEM, row.auditId, AUDIT)}

                                        >
                                            <TableCell component='th' scope='row'>
                                                <Typography
                                                    component='span'
                                                    data-cy={ID}
                                                >
                                                    {row.auditId}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    component='span'
                                                // data-cy={DESCRIPTION}
                                                >
                                                    {row.message}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    component='span'
                                                // data-cy={STATUS}
                                                >
                                                    {row.code}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    component='span'
                                                    data-cy={DATETIME}
                                                >
                                                    {formatDatetime(row.createdOn)}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Fragment >
    );
}