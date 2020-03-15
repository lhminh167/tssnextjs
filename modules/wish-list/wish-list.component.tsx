import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Link from 'next/link';
import React, { Fragment } from 'react';
import ShoppingCartQuantityPicker from '../shopping-cart/item-list/shopping-cart-quantity-picker.component';
import ShoppingCartTableHead from '../shopping-cart/item-list/table-head/table-head.component';
import ShoppingCartTableToolbar from '../shopping-cart/item-list/table-toolbar/table-toolbar.component';
import { IShopingCartItem } from '../shopping-cart/shopping-cart.model';
import WishListItemDetail from './item-detail.component';

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
    data: IShopingCartItem[];
}

function WishListComponent({ data }: IProps) {
    const classes = useShoppingCartStyles({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let numOfItems: number = data.length ? data.map(x => x.quantity).reduce((acc, cur) => { return acc + cur }, 0) : 0;

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
        <Paper>
            <ShoppingCartTableToolbar numOfItems={numOfItems} />
            <div className={classes.tableWrapper}>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size="small"
                >
                    <ShoppingCartTableHead
                        rowCount={data.length}
                    />
                    <TableBody>
                        {
                            data?.length
                                ?
                                <Wishlist
                                    data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                />
                                :
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
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
                    <Link
                        href="/"
                        as="/"
                        passHref
                    >
                        <Fab
                            component="a"
                            variant="extended"
                            color="default"
                        >
                            Back to Shop
                        </Fab>
                    </Link>
                </Grid>
            </Grid>
        </Paper>
    );
}

interface WishlistProps {
    data: IShopingCartItem[];
}

function Wishlist({
    data
}: WishlistProps) {
    const classes = useShoppingCartStyles({});
    return (
        <Fragment>
            {
                data?.map((row) => {
                    const attributes: string[] = row?.attributes?.split(':')[1].split('/');
                    const color: string = attributes[0];
                    const size: string = attributes[1];

                    return (
                        <TableRow
                            hover
                            tabIndex={-1}
                            key={row.itemId}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                            >
                                <WishListItemDetail data={row} color={color}

                                />
                            </TableCell>
                            <TableCell align="center">{size}</TableCell>
                            <TableCell align="center">

                                <ShoppingCartQuantityPicker item={row} />

                            </TableCell>
                            <TableCell align="center">
                                {
                                    row?.product?.discountedPrice > 0
                                        ? row?.product?.discountedPrice
                                        : row?.product?.price
                                }
                            </TableCell>
                        </TableRow>
                    );
                })
            }
        </Fragment >
    );
}

export default WishListComponent;