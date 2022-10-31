import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import IconButton from "@mui/material/IconButton";
import { Theme, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import Link from "next/link";
import React from "react";
import { FIRST, LAST, NEXT, PREVIOUS } from "../tag/tag.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

export interface PaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  firstPageUrl?: any;
  previousPageUrl?: any;
  nextPageUrl?: any;
  lastPageUrl?: any;
}

export default function PaginationComponent({
  count,
  page,
  rowsPerPage,
  onPageChange,
  firstPageUrl,
  previousPageUrl,
  nextPageUrl,
  lastPageUrl,
}: PaginationProps) {
  const classes = useStyles();
  const theme = useTheme();

  const toFirstPage = (event) => {
    onPageChange(event, 0);
  };

  const toPreviousPage = (event) => {
    onPageChange(event, page - 1);
  };

  const toNextPage = (event) => {
    onPageChange(event, page + 1);
  };

  const toLastPage = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      {firstPageUrl && (
        <Link href={firstPageUrl} passHref>
          <IconButton
            disabled={page === 0}
            aria-label="first page"
            component="a"
            data-cy={FIRST}
            size="large"
          >
            {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
        </Link>
      )}
      {!firstPageUrl && (
        <IconButton
          disabled={page === 0}
          aria-label="first page"
          onClick={toFirstPage}
          data-cy={FIRST}
          size="large"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      )}
      {previousPageUrl && (
        <Link href={previousPageUrl} passHref>
          <IconButton
            disabled={page === 0}
            aria-label="previous page"
            component="a"
            data-cy={PREVIOUS}
            size="large"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </IconButton>
        </Link>
      )}
      {!previousPageUrl && (
        <IconButton
          disabled={page === 0}
          aria-label="previous page"
          onClick={toPreviousPage}
          data-cy={PREVIOUS}
          size="large"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
      )}
      {nextPageUrl && (
        <Link href={nextPageUrl} passHref>
          <IconButton
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
            component="a"
            data-cy={NEXT}
            size="large"
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </IconButton>
        </Link>
      )}
      {!nextPageUrl && (
        <IconButton
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
          onClick={toNextPage}
          data-cy={NEXT}
          size="large"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      )}
      {lastPageUrl && (
        <Link href={lastPageUrl} passHref>
          <IconButton
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
            component="a"
            data-cy={LAST}
            size="large"
          >
            {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </Link>
      )}
      {!lastPageUrl && (
        <IconButton
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
          onClick={toLastPage}
          data-cy={LAST}
          size="large"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      )}
    </div>
  );
}
