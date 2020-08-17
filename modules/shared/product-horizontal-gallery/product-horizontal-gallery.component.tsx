import {
  createMuiTheme,
  Fab,
  Grid,
  useMediaQuery,
  ThemeProvider,
  Typography,
  GridList,
  GridListTile
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import React, { useEffect, ElementType } from 'react';
import { PaginatedList } from '../crud/crud.model';
import theme from '../layout/layout.theme';
import { IProduct } from '../models/product.model';
import ProductCard from '../product-card/product-card.component';
import GalleryHeaderComponent from '../gallery-header/gallery-header.component';

export const horizontalGalleryTheme = createMuiTheme({
  ...theme,
  overrides: {
    MuiButtonBase: {
      root: {
        '&$disabled': {
          pointerEvents: 'unset'
        }
      }
    },
    MuiFab: {
      root: {
        position: 'absolute',
        zIndex: theme.zIndex.modal,
        backgroundColor: 'rgba(0,0,0,.7)'
      }
    }
  }
});

export const usehorizontalGalleryStyles = makeStyles((theme: Theme) =>
  createStyles({
    previous: {
      left: 0
    },
    next: {
      right: 0
    },
    container: {
      position: 'relative'
    },
    gridList: {
      width: '100%',
      //   marginTop: theme.spacing(3),
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    },
    gridListTile: {
      // boxShadow:
      //   '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    },
    last: {
      // paddingRight: '0 !important'
    }
  })
);

interface Props {
  data: PaginatedList<IProduct>;
  output: any;
  title?: any;
  titleIcon?: any;
  seeMore?: any;
  CardElement?: ElementType<{ data: IProduct }>;
  fixedPageSize?: number;
  customTitle?: any;
}

export default function ProductHorizontalGallery({
  data,
  output,
  title,
  titleIcon,
  seeMore,
  CardElement,
  fixedPageSize,
  customTitle
}: Props) {
  const classes = usehorizontalGalleryStyles({});
  const matches = useMediaQuery('(min-width:600px)');
  const pageSize = fixedPageSize ? fixedPageSize : matches ? 4 : 2;
  const items = data.items.slice(0, pageSize).filter(e => e);

  useEffect(() => {
    if (pageSize > data.pageSize)
      output({
        pageIndex: 0,
        pageSize
      });
  }, [pageSize]);

  const toPreviousPage = () => {
    output({
      pageIndex: data.pageIndex - 1,
      pageSize
    });
  };

  const toNextPage = () => {
    output({
      pageIndex: data.pageIndex + 1,
      pageSize
    });
  };

  return (
    <ThemeProvider theme={horizontalGalleryTheme}>
      <Grid container
        component='article'
      >
        <GalleryHeaderComponent
          title={title}
          titleIcon={titleIcon}
          seeMore={seeMore}
          customTitle={customTitle}
        />
        <Grid container item className={classes.container} alignItems='center'>
          <Fab
            className={classes.previous}
            onClick={toPreviousPage}
            disabled={data.pageIndex === 0}
            size='medium'
          >
            <ArrowBackIosRoundedIcon />
          </Fab>
          <GridList
            cellHeight={'auto'}
            cols={pageSize}
            className={classes.gridList}
            component='div'
          >
            {items.map((entry, index) => (
              <GridListTile
                component='section'
                key={entry.productId}
                classes={{
                  tile: classes.gridListTile,
                  root: (index === items.length - 1 ? classes.last : '')
                }}
              >
                {CardElement ? (
                  <CardElement data={entry} />
                ) : (
                    <ProductCard data={entry} />
                  )}
              </GridListTile>
            ))}
          </GridList>
          <Fab
            className={classes.next}
            disabled={data.pageIndex >= Math.ceil(data.count / pageSize) - 1}
            onClick={toNextPage}
            size='medium'
          >
            <ArrowForwardIosRoundedIcon />
          </Fab>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
