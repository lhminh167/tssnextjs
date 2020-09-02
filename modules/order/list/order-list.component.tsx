import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from 'react';
import { goTo } from '../../shared/helpers/auth.helper';
import { formatDatetime } from '../../shared/helpers/string.helper';
import { textDanger, textSuccess, textWarning } from '../../shared/layout/layout.style';
import { ID, ITEM } from '../../shared/tag/tag.model';
import { Order, orderUrl } from '../order.model';
import { getOrders } from '../order.service';

const useStyles = makeStyles({
    textSuccess: textSuccess,
    textDanger: textDanger,
    textWarning: textWarning
});

export default function OrderListComponent() {
    const classes = useStyles({});
    const [state, setState] = React.useState<Order[]>([]);

    useEffect(() => {
        if (state.length) return;
        getOrders().then(data => {
            setState(data.content);
        })
    }, []);

    const showDetail = (orderId: number) => () => {
        const url = orderUrl.detail(orderId);
        goTo(url.href, null, url.as);
    };

    return (
        <TableContainer component={Paper}>
            <Table
                size='small'
            >
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Created On</TableCell>
                        <TableCell>Shipped On</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.map((row: Order) => (
                        <TableRow
                            key={row.orderId}
                            hover
                            onClick={showDetail(row.orderId)}
                            data-cy={ITEM}
                        >
                            <TableCell component='th' scope='row'
                                data-cy={ID}
                            >

                                {row.orderId}
                            </TableCell>
                            <TableCell
                                className={classes[row.orderStatus.cssClass]}
                            >
                                {row.orderStatus.message}
                            </TableCell>
                            <TableCell>{row.customer.name}</TableCell>
                            <TableCell>{formatDatetime(row.createdOn)}</TableCell>
                            <TableCell>{formatDatetime(row.shippedOn)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
