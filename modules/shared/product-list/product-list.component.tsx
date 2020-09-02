import { GridList, GridListTile, useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { IProduct } from '../models/product.model';
import ProductCardComponent from '../product-card/product-card.component';
import { transitionWidth } from '../layout/layout.theme';

interface IProps {
  data: IProduct[];
}

export default function ProductListComponent({ data }: IProps) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <GridList
      cellHeight={'auto'}
      cols={matches ? 4 : 2}
    >
      {
        data?.map(entry => (

          <GridListTile
            key={entry.productId}
          >
            <ProductCardComponent data={entry} />
          </GridListTile>

        ))}
    </GridList>
  );
}
