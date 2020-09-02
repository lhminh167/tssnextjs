import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect } from 'react';
import { goTo, toNumber } from '../../shared/helpers/auth.helper';
import { ID, ITEM } from '../../shared/tag/tag.model';
import { Customer, customerUrl } from '../customer.model';
import { getCustomers } from '../customer.service';

export default function CustomerListComponent() {
    const [state, setState] = React.useState<Customer[]>([]);

    useEffect(() => {
        if (state.length) return;
        getCustomers().then(data => {
            setState(data.content);
        })
    }, []);

    const showDetail = (id: string) => () => {
        const customerId: number = toNumber(id);
        const url = customerUrl.detail(customerId);
        goTo(url);
    };

    return (
        <TableContainer component={Paper}>
            <Table
                size='small'
            >
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.map(row => (
                        <TableRow
                            key={row.customerId}
                            hover
                            onClick={showDetail(row.customerId)}
                            data-cy={ITEM}
                        >
                            <TableCell component='th' scope='row'
                                data-cy={ID}
                            >
                                {row.customerId}
                            </TableCell>
                            <TableCell>
                                {row.name}
                            </TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
