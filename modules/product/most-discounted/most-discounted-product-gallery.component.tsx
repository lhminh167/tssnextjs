import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Link from 'next/link';
import React, { useState } from 'react';
import { PaginatedList } from '../../shared/crud/crud.model';
import { toUrl, formatCurrency } from '../../shared/helpers/string.helper';
import Image from '../../shared/image/image';
import { themeColor } from '../../shared/layout/layout.theme';
import { IProduct } from '../../shared/models/product.model';
import ProductHorizontalGallery from '../../shared/product-horizontal-gallery/product-horizontal-gallery.component';
import {
  defaultProductSearchRequest,
  IProductSearchRequest,
  SortByEnum,
  productUrl
} from '../filter/product-filter.model';
import { getProducts } from '../filter/product-filter.service';
import { DiscountIcon } from '../../shared/svg/svg.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  })
);

interface Props {
  data: PaginatedList<IProduct>;
}

export default function MostDiscountedProductGallery({ data }: Props) {
  const classes = useStyles({});
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
      seeMore={
        <Link href='/product' as='/product' passHref>
          <Button component='a'>See All Discounted Products</Button>
        </Link>
      }
      CardElement={MostDiscountedProductCard}
    />
  );
}

const useCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center'
    },
    cardActions: {
      justifyContent: 'center',
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3)
    },
    discountTag: {
      position: 'absolute',
      top: 0,
      right: 0,
      // minWidth: '4.5rem'
      padding: '0 0.2rem'
    },
  })
);

interface MostDiscountedProductCardProps {
  data: IProduct;
}

function MostDiscountedProductCard({ data }: MostDiscountedProductCardProps) {
  const classes = useCardStyles();
  return (
    <Card>
      <Link
        href={productUrl.detail(data).href}
        as={productUrl.detail(data).as}
        passHref
      >
        <Typography component='a' color='inherit'>
          <CardActionArea className={classes.root}>
            <CardMedia>
              <Button
                variant='contained'
                className={classes.discountTag}
                component='div'
                color='primary'
              >

                {data.discountedPrice ?
                  Math.round(
                    ((data.price - data.discountedPrice) / data.price) * 100
                  )
                  : 0}% off

              </Button>

              <Image
                imageName={data.thumbnail}
              />
            </CardMedia>
            <CardContent>
              <Typography variant='subtitle1' gutterBottom noWrap>
                {data.name}
              </Typography>
              <Typography variant='subtitle2' gutterBottom>
                {formatCurrency(data.price)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Typography>
      </Link>
    </Card>
  );
}
