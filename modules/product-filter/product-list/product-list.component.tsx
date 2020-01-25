import { GridList, GridListTile } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React from "react";
import { IProduct } from "../../shared/models/product.model";
import PaginationActions from "../pagination-actions/pagination-actions";
import ProductCard from "../product-card/product-card.component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      marginTop: theme.spacing(3),
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)"
    },
    gridListTile: {
      boxShadow:
        "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
    }
  })
);

interface IProps {
  rows: IProduct[];
}

function ProductFilterProductList(props: IProps) {
  const classes = useStyles(props);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const { rows } = props;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const theme = useTheme();

  // const ssrMatchMedia = query => ({
  //     matches: mediaQuery.match(query, {
  //         // The estimated CSS width of the browser.
  //         width: 800,
  //     }),
  // });

  const matches = useMediaQuery("(min-width:600px)");

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  return (
    <div>
      {/* <ThemeProvider
                theme={{
                    props: {
                        // Change the default options of useMediaQuery
                        MuiUseMediaQuery: { ssrMatchMedia },
                    },
                }}
            > */}
      <GridList
        cellHeight={"auto"}
        className={classes.gridList}
        cols={matches ? 4 : 2}
      >
        {rows &&
          rows.length &&
          rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(tile => (
              <GridListTile
                key={tile.thumbnail}
                classes={{ tile: classes.gridListTile }}
              >
                <ProductCard key={tile.thumbnail} data={tile} />
              </GridListTile>
            ))}
      </GridList>
      {/* </ThemeProvider> */}

      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        colSpan={3}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { "aria-label": "Rows per page" },
          native: true
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={PaginationActions}
      />
    </div>
  );
}

export default ProductFilterProductList;
