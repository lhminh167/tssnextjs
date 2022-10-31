import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Grid, IconButton, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { Fragment, useEffect, useState } from "react";
import {
  defaultPaginationRequest,
  PaginatedList,
  PaginationRequest,
} from "../crud/crud.model";
import ErrorBoundary from "../error-boundary/error-boundary.component";
import { IProduct } from "../models/product.model";
import ProductHorizontalGallery from "../product-horizontal-gallery/product-horizontal-gallery.component";
import { DOT } from "../tag/tag.model";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dots: {
      position: "absolute",
      bottom: 0,
      listStyle: "none",
    },
  })
);

export const defaultAutoplay: number = 3000;

interface Props {
  data: PaginatedList<IProduct>;
  autoplay?: number;
  card: any;
}

export default function ProductCarouselComponent({
  data,
  autoplay,
  card,
}: Props) {
  const classes = useStyles({});

  const [state, setState] = useState<PaginatedList<IProduct>>({
    ...data,
    items: [data.items[0]],
    pageSize: 1,
    totalPages: 1,
    count: 8,
  });

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      const pageIndex =
        state.pageIndex === state.count - 1 ? 0 : state.pageIndex + 1;

      setState({
        ...state,
        items: [data.items[pageIndex]],
        pageIndex,
      });
    }, autoplay);

    return () => clearInterval(interval);
  }, [state.pageIndex]);

  function change({ pageIndex, pageSize }: PaginationRequest) {
    setState({
      ...state,
      items: [data.items[pageIndex]],
      pageIndex,
    });
  }

  return (
    <Fragment>
      <ErrorBoundary>
        <ProductHorizontalGallery
          data={state}
          output={change}
          title={null}
          seeMore={null}
          CardElement={card}
          fixedPageSize={1}
        />
      </ErrorBoundary>
      <Grid
        container
        item
        xs={12}
        direction="row"
        justifyContent="center"
        className={classes.dots}
        component="ul"
      >
        {data.items.map((entry, index) => (
          <Grid item key={entry.productId} component="li">
            <IconButton
              size="small"
              onClick={() =>
                change({
                  ...defaultPaginationRequest,
                  pageIndex: index,
                  pageSize: 1,
                })
              }
              data-cy={DOT}
            >
              <FiberManualRecordIcon
                fontSize="inherit"
                color={state.pageIndex === index ? "primary" : "inherit"}
              />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}
