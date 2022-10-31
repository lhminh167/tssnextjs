import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { goTo, toNumber } from "../../shared/helpers/auth.helper";
import { ID, ITEM } from "../../shared/tag/tag.model";
import { Customer, customerUrl } from "../customer.model";
import { getCustomers } from "../customer.service";

export default function CustomerListComponent() {
  const [state, setState] = React.useState<Customer[]>([]);

  useEffect(() => {
    if (state.length) return;
    getCustomers().then((data) => {
      setState(data.content);
    });
  }, []);

  const showDetail = (id: string) => () => {
    const customerId: number = toNumber(id);
    const url = customerUrl.detail(customerId);
    goTo(url.href, "", url.as);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((row) => (
            <TableRow
              key={row.customerId}
              hover
              onClick={showDetail(row.customerId)}
              data-cy={ITEM}
            >
              <TableCell component="th" scope="row" data-cy={ID}>
                {row.customerId}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
