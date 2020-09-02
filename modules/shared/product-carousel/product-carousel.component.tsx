import {
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme
} from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Fragment, useEffect, useState } from 'react';
import { PaginatedList } from '../crud/crud.model';
import { IProduct } from '../models/product.model';
import ProductHorizontalGallery from '../product-horizontal-gallery/product-horizontal-gallery.component';
import ErrorBoundary from '../error-boundary/error-boundary.component';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dots: {
      position: 'absolute',
      bottom: 0,
      listStyle: 'none'
    }
  })
);

interface Props {
  data: PaginatedList<IProduct>;
  autoplay?: number;
  card: any;
}

export default function ProductCarouselComponent({
  data,
  autoplay,
  card
}: Props) {
  const classes = useStyles({});

  const [state, setState] = useState<PaginatedList<IProduct>>({
    ...data,
    items: [data.items[0]],
    pageSize: 1,
    totalPages: 1,
    count: 8
  });

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      const pageIndex =
        state.pageIndex === state.count - 1 ? 0 : state.pageIndex + 1;

      setState({
        ...state,
        items: [data.items[pageIndex]],
        pageIndex
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [state.pageIndex]);

  function change({ pageIndex, pageSize }) {
    setState({
      ...state,
      items: [data.items[pageIndex]],
      pageIndex
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
        direction='row'
        justify='center'
        className={classes.dots}
        component='ul'
      >
        {data.items.map((entry, index) => (
          <Grid item key={entry.productId}
            component='li'
          >
            <IconButton
              size='small'
              onClick={() =>
                change({
                  pageIndex: index,
                  pageSize: 1
                })
              }
            >
              <FiberManualRecordIcon
                fontSize='inherit'
                color={state.pageIndex === index ? 'primary' : 'inherit'}
              />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
}
