import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Link from 'next/link';
import React from 'react';
import { NEXT, PREVIOUS, FIRST, LAST } from '../tag/tag.model';

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
                        data-cy={FIRST}
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
                    data-cy={FIRST}
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
                        data-cy={PREVIOUS}
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
                    data-cy={PREVIOUS}
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
                        data-cy={NEXT}
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
                    data-cy={NEXT}
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
                        data-cy={LAST}
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
                    data-cy={LAST}
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            }
        </div>
    );
}

