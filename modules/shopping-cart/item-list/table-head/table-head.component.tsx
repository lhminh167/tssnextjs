import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import React from 'react';
import Typography from '@material-ui/core/Typography';

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

interface IProps {
    // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    // order: Order;
    // orderBy: string;
    rowCount: number;
}

function ShoppingCartTableHead(props: IProps) {
    const {
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
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default ShoppingCartTableHead;