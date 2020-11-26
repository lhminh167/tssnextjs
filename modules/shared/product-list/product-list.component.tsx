import { GridList, GridListTile } from '@material-ui/core';
import React from 'react';
import { isMediumWidth } from '../layout/layout.theme';
import { IProduct } from '../models/product.model';
import ProductCardComponent from '../product-card/product-card.component';

interface IProps {
  data: IProduct[];
}

export default function ProductListComponent({ data }: IProps) {
  const matches = isMediumWidth();

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
