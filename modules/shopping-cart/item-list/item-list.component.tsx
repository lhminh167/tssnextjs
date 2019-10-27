import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { IRootState } from '../../root/root.model';
import QuantityPicker from '../../shared/quantity-picker/quantity-picker.component';
import ShoppingCartItemDetail from './item-detail/item-detail.component';
import { IShopingCartItem } from '../shopping-cart.model';
import shoppingCart from '../shopping-cart.slice';
import ShoppingCartTableHead from './table-head/table-head.component';
import ShoppingCartTableToolbar from './table-toolbar/table-toolbar.component';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';

export const useShoppingCartStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 750,
        },
        tableWrapper: {
            overflowX: 'auto',
            margin: theme.spacing(3),
        },
        visuallyHidden: {

        },
        footerButton: {
            marginY: theme.spacing(3),
        }
    }),
);

interface IProps {
    data: any;
}

function ShoppingCartItemList(props: IProps) {
    const classes = useShoppingCartStyles({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const { data } = props;
    const rows = data.length > 0 ? data : [];
    const dispatch = useDispatch();


    useEffect(() => {
        // dispatch(shoppingCart.actions.getCartPending());
        return () => { return; };
    }, []);


    let numOfItems = rows ? rows.map(x => x.quantity).reduce((acc, cur) => { return acc + cur }, 0) : 0;

    // function showCheckout() {
    //     output(true);
    // }

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    function updateItem(item: IShopingCartItem) {
        dispatch(shoppingCart.actions.updateCartPending({ content: item }));
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <Fragment>
            <ShoppingCartTableToolbar numOfItems={numOfItems} />
            <div className={classes.tableWrapper}>

                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="small"
                // stickyHeader
                >
                    <ShoppingCartTableHead
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {
                            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    const attributes = row.attributes.split(':')[1].split('/');
                                    const color = attributes[0];
                                    const size = attributes[1];

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.itemId}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" padding="none">
                                                <ShoppingCartItemDetail input={row} color={color} />
                                            </TableCell>
                                            <TableCell align="center">{size}</TableCell>
                                            <TableCell align="center">
                                                <QuantityPicker quantity={row.quantity} output={(quantity) => updateItem({ itemId: row.itemId, quantity })} />
                                            </TableCell>
                                            <TableCell align="center">{row.price}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 49 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Divider />
            <Grid container
                justify="space-between"
                spacing={2}
            >
                <Grid item
                    className={classes.footerButton}
                >
                    <Link href="/" as="/">
                        <Fab variant="extended" color="default">
                            Back to Shop
                        </Fab>
                    </Link>
                </Grid>
                <Grid item
                    className={classes.footerButton}
                >
                    <Link href="/checkout" as="/checkout">

                        <Fab variant="extended" color="primary">
                            Checkout
                        </Fab>
                    </Link>
                </Grid>
            </Grid>
        </Fragment >
    );
}

export default ShoppingCartItemList;