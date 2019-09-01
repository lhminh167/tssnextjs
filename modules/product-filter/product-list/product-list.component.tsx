import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, Fragment } from 'react';
import { IProductFilterProduct } from '../product-filter.model';
import ProductCard from '../product-card/product-card.component';
import PaginationActions from '../pagination-actions/pagination-actions';
import { GridList, GridListTileBar, IconButton, GridListTile, Card } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridList: {
            marginTop: theme.spacing(3),
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        gridListTile: {
            boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
        },
    }),
);

interface Props {
    rows: IProductFilterProduct[];
    width: Breakpoint;
    // width: string;
}


function ProductFilterProductList(props: Props) {
    const classes = useStyles(props);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(12);
    const { rows, width } = props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const theme = useTheme();
    const cols =
        isWidthUp('lg', width) ? 5 :
        isWidthUp('md', width) ? 4 :
        isWidthUp('sm', width) ? 3 :
        isWidthUp('xs', width) ? 2 :
        1;

    function handleChangePage(
        event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
        newPage: number,
    ) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        setRowsPerPage(parseInt(event.target.value, 10));
    }

    return (
        <Fragment>

            <GridList
            cellHeight={"auto"}
            spacing={theme.spacing(3)}
            className={classes.gridList}
            cols={cols}
            >
                {rows && rows.length && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(tile => (
                    <GridListTile key={tile.thumbnail} classes={{tile: classes.gridListTile}}>
                        <ProductCard key={tile.thumbnail} input={tile} />
                    </GridListTile>
                ))}
            </GridList>

            <TablePagination
                component="div"
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                    inputProps: { 'aria-label': 'Rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={PaginationActions}
            />

        </Fragment>
    );
}

export default withWidth()(ProductFilterProductList);
