import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }),
);

export interface PaginationProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
    firstPageUrl?: any;
    previousPageUrl?: any;
    nextPageUrl?: any;
    lastPageUrl?: any;
}

export default function PaginationComponent({
    count,
    page,
    rowsPerPage,
    onChangePage,
    firstPageUrl,
    previousPageUrl,
    nextPageUrl,
    lastPageUrl
}: PaginationProps) {
    const classes = useStyles();
    const theme = useTheme();

    const toFirstPage = (event) => {
        onChangePage(event, 0);
    };

    const toPreviousPage = (event) => {
        onChangePage(event, page - 1);
    };

    const toNextPage = (event) => {
        onChangePage(event, page + 1);
    };

    const toLastPage = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            {
                firstPageUrl &&
                <Link
                    href={firstPageUrl}
                    passHref
                >
                    <IconButton
                        disabled={page === 0}
                        aria-label='first page'
                        component='a'
                    >
                        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                    </IconButton>
                </Link>
            }
            {
                !firstPageUrl &&
                <IconButton
                    disabled={page === 0}
                    aria-label='first page'
                    onClick={toFirstPage}
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
            }
            {
                previousPageUrl &&
                <Link
                    href={previousPageUrl}
                    passHref
                >
                    <IconButton
                        disabled={page === 0}
                        aria-label='previous page'
                        component='a'
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </IconButton>
                </Link>
            }
            {
                !previousPageUrl &&
                <IconButton
                    disabled={page === 0}
                    aria-label='previous page'
                    onClick={toPreviousPage}
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
            }
            {
                nextPageUrl &&
                <Link
                    href={nextPageUrl}
                    passHref
                >
                    <IconButton
                        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                        aria-label='next page'
                        component='a'
                    >
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </IconButton>
                </Link>
            }
            {
                !nextPageUrl &&
                <IconButton
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label='next page'
                    onClick={toNextPage}
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
            }
            {
                lastPageUrl &&
                <Link
                    href={lastPageUrl}
                    passHref
                >
                    <IconButton
                        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                        aria-label='last page'
                        component='a'
                    >
                        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                    </IconButton>
                </Link>
            }
            {
                !lastPageUrl &&
                <IconButton
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label='last page'
                    onClick={toLastPage}
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            }
        </div>
    );
}

