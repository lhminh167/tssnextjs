import { TablePagination } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Fragment, useEffect, useState } from 'react';
import { defaultProductSearchRequest } from '../../product/filter/product-filter.model';
import { defaultPaginationList, defaultPaginationRequest, defaultRowsPerPageOptions, PaginatedList, PaginationRequest } from '../../shared/crud/crud.model';
import { goTo } from '../../shared/helpers/auth.helper';
import { formatDatetime } from '../../shared/helpers/string.helper';
import { textDanger, textSuccess, textWarning } from '../../shared/layout/layout.style';
import PaginationComponent, { PaginationProps } from '../../shared/pagination/pagination.component';
import { CREATED_ON, DATETIME, ID, ITEM, NAME, ORDER, SHIPPING, STATUS, tag, USER, USERNAME } from '../../shared/tag/tag.model';
import { apiOrderUrl, Order, orderUrl } from '../order.model';
import { getOrders } from '../order.service';

const useStyles = makeStyles({
    textSuccess: textSuccess,
    textDanger: textDanger,
    textWarning: textWarning
});

export default function OrderListComponent() {
    const classes = useStyles({});
    const [state, setState] = useState<PaginatedList<Order>>(defaultPaginationList);
    const [choice, setChoice] = useState<PaginationRequest>({
        ...defaultPaginationRequest,
        isPagingEnabled: true,
        pageSize: 8
    });

    useEffect(() => {
        getData(choice);
    }, []);

    const showDetail = (orderId: number) => () => {
        const url = orderUrl.detail(orderId);
        goTo(url.href, null, url.as);
    };

    async function getData(input: PaginationRequest) {
        const res = await getOrders(input);
        setChoice(input);
        setState(res.content);
    }

    async function changePageIndex(
        event,
        newPageIndex: number
    ) {
        await getData({
            ...choice,
            pageIndex: newPageIndex,
        });
    }

    async function changePageSize(
        event
    ) {
        await getData({
            ...choice,
            pageSize: parseInt(event.target.value, 10),
            pageIndex: defaultProductSearchRequest.pageIndex,
        });
    }

    function OrderListPaginationComponent({
        count,
        page,
        rowsPerPage,
        onChangePage
    }: PaginationProps) {
        return (
            <PaginationComponent
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={onChangePage}
            />
        )
    }

    return (
        <Fragment>
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
                        {state.items.map((row: Order) => (
                            <TableRow
                                key={row.orderId}
                                hover
                                onClick={showDetail(row.orderId)}
                            >
                                <TableCell component='th' scope='row'
                                    data-cy={tag(ID, row.orderId, ORDER)}
                                >
                                    {row.orderId}
                                </TableCell>
                                <TableCell
                                    className={classes[row.orderStatus.cssClass]}
                                    data-cy={tag(STATUS, row.orderId, ORDER)}
                                >
                                    {row.orderStatus.message}
                                </TableCell>
                                <TableCell
                                    data-cy={tag(USER + NAME, row.orderId, ORDER)}
                                >
                                    {row.customer.name}
                                </TableCell>
                                <TableCell
                                    data-cy={tag(CREATED_ON, row.orderId, ORDER)}
                                >
                                    {formatDatetime(row.createdOn)}
                                </TableCell>
                                <TableCell
                                    data-cy={tag(SHIPPING + DATETIME, row.orderId, ORDER)}
                                >
                                    {formatDatetime(row.shippedOn)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={defaultRowsPerPageOptions}
                component='div'
                count={state.count}
                rowsPerPage={choice.pageSize}
                page={choice.pageIndex}
                onChangePage={changePageIndex}
                onChangeRowsPerPage={changePageSize}
                ActionsComponent={OrderListPaginationComponent}
            />
        </Fragment>
    );
}
