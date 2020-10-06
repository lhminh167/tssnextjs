import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { PaginatedList } from '../../shared/crud/crud.model';
import { IProduct } from '../../shared/models/product.model';
import ProductCardComponent from '../../shared/product-card/product-card.component';
import ProductHorizontalGallery from '../../shared/product-horizontal-gallery/product-horizontal-gallery.component';
import { DiscountIcon } from '../../shared/svg/svg.component';
import { MOST_DISCOUNTED } from '../../shared/tag/tag.model';
import {
  defaultProductSearchRequest,
  IProductSearchRequest,

  SortByEnum
} from '../filter/product-filter.model';
import { getProducts } from '../filter/product-filter.service';

interface Props {
  data: PaginatedList<IProduct>;
}

export default function MostDiscountedProductGalleryComponent({ data }: Props) {
  const [state, setState] = useState<PaginatedList<IProduct>>(data);
  const [choice, setChoice] = useState<IProductSearchRequest>({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.MostDiscounted
  });

  async function change({ pageIndex, pageSize }) {
    const newChoice: IProductSearchRequest = {
      ...choice,
      pageIndex,
      pageSize
    };
    const response = await getProducts(newChoice);
    setState(response.content);
    setChoice(newChoice);
  }

  return (
    <ProductHorizontalGallery
      galleryTestId={MOST_DISCOUNTED}
      data={state}
      output={change}
      title={
        <Typography variant='h6' component='h2'>
          Most Discounted
        </Typography>
      }
      titleIcon={
        <DiscountIcon
          color='primary'
          style={{
            fontSize: '4rem'
          }}
        />
      }
      // seeMore={
      //   <Link href='/product' as='/product' passHref>
      //     <Button component='a'>See All Discounted Products</Button>
      //   </Link>
      // }
      CardElement={MostDiscountedProductCard}
    />
  );
}

interface MostDiscountedProductCardProps {
  data: IProduct;
}

function MostDiscountedProductCard({
  data
}: MostDiscountedProductCardProps) {
  return (
    <ProductCardComponent
      data={data}
      showPercentage
    />
  );
}
