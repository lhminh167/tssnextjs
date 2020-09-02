import { GridList, GridListTile } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { IProduct } from '../models/product.model';
import ProductCard from '../product-card/product-card.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      //   marginTop: theme.spacing(3),
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)'
    },
    gridListTile: {
      // boxShadow:
      //   '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
    }
  })
);

interface IProps {
  data: IProduct[];
}

export default function ProductListComponent({ data }: IProps) {
  const classes = useStyles({});
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <GridList
      cellHeight={'auto'}
      className={classes.gridList}
      cols={matches ? 4 : 2}
    >
      {data &&
        data.length &&
        data.map(entry => (

          <GridListTile
            key={entry.productId}
            classes={{ tile: classes.gridListTile }}
          >
            <ProductCard data={entry} />
          </GridListTile>

        ))}
    </GridList>
  );
}
