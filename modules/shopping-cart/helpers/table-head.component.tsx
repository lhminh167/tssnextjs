import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';
import { useShoppingCartStyles } from '../shopping-cart.component';
import Typography from '@material-ui/core/Typography';
import { Order } from './sorting';

interface Data {
    item: number;
    size: number;
    quantity: number;
    price: string;
}


interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    { id: 'item', numeric: false, disablePadding: true, label: 'Item' },
    { id: 'size', numeric: true, disablePadding: false, label: 'Size' },
    { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useShoppingCartStyles>;
    // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    // order: Order;
    // orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { classes,
        // order,
        // orderBy,
        rowCount,
        // onRequestSort
    } = props;
    // const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    //     onRequestSort(event, property);
    // };

    return (
        <TableHead>
            <TableRow>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'center' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        // sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <Typography variant="body2">
                            {headCell.label}
                        </Typography>
                        {/* <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={order}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel> */}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default EnhancedTableHead;