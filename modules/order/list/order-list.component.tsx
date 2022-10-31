import { TablePagination, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TablePaginationActionsProps } from "@mui/material/TablePagination/TablePaginationActions";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { ChangeEvent, Fragment, MouseEvent, useEffect, useState } from "react";
import { defaultProductSearchRequest } from "../../product/filter/product-filter.model";
import {
  defaultPaginationList,
  defaultPaginationRequest,
  defaultRowsPerPageOptions,
  PaginatedList,
  PaginationRequest,
} from "../../shared/crud/crud.model";
import { goTo } from "../../shared/helpers/auth.helper";
import { formatDatetime } from "../../shared/helpers/string.helper";
import {
  textDanger,
  textSuccess,
  textWarning,
} from "../../shared/layout/layout.style";
import PaginationComponent from "../../shared/pagination/pagination.component";
import {
  DATETIME,
  ID,
  ITEM,
  NAME,
  ORDER,
  SHIPPING,
  STATUS,
  tag,
  USER,
} from "../../shared/tag/tag.model";
import { Order, orderUrl } from "../order.model";
import { getOrders } from "../order.service";

const useStyles = makeStyles({
  textSuccess: textSuccess,
  textDanger: textDanger,
  textWarning: textWarning,
});

export default function OrderListComponent() {
  const classes = useStyles({});
  const [state, setState] = useState<PaginatedList<Order>>(
    defaultPaginationList
  );
  const [choice, setChoice] = useState<PaginationRequest>({
    ...defaultPaginationRequest,
    isPagingEnabled: true,
    pageSize: 8,
  });

  useEffect(() => {
    getData(choice);
  }, []);

  const showDetail = (orderId: number) => () => {
    const url = orderUrl.detail(orderId);
    goTo(url.href, "", url.as);
  };

  async function getData(input: PaginationRequest) {
    const res = await getOrders(input);
    setChoice(input);
    setState(res.content);
  }

  async function changePageIndex(
    event: MouseEvent<HTMLButtonElement> | null,
    newPageIndex: number
  ) {
    await getData({
      ...choice,
      pageIndex: newPageIndex,
    });
  }

  async function changePageSize(event: ChangeEvent<HTMLInputElement>) {
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
    onPageChange,
  }: TablePaginationActionsProps) {
    return (
      <PaginationComponent
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
      />
    );
  }

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table size="small">
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
                data-cy={tag(ITEM, row.orderId, ORDER)}
              >
                <TableCell component="th" scope="row">
                  <Typography component="span" data-cy={tag(ID)}>
                    {row.orderId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="span"
                    className={classes[row.orderStatus.cssClass] as string}
                    data-cy={tag(STATUS)}
                  >
                    {row.orderStatus.message}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="span" data-cy={tag(USER + NAME)}>
                    {row.customer.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="span" data-cy={tag(DATETIME)}>
                    {formatDatetime(row.createdOn)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    component="span"
                    data-cy={tag(SHIPPING + DATETIME)}
                  >
                    {formatDatetime(row.shippedOn)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={defaultRowsPerPageOptions}
        component="div"
        count={state.count}
        rowsPerPage={choice.pageSize}
        page={choice.pageIndex}
        onPageChange={changePageIndex}
        onRowsPerPageChange={changePageSize}
        ActionsComponent={OrderListPaginationComponent}
        labelRowsPerPage="Items per page:"
      />
    </Fragment>
  );
}
