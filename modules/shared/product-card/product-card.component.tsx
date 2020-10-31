import { Button, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import { productUrl } from '../../product/filter/product-filter.model';
import ImageComponent from '../image/image.component';
import { getDiscountedPrice, getDiscountPercentage, IProduct } from '../models/product.model';
import { DISCOUNTED_PRICE, NAME, PERCENTAGE, PRODUCT_CARD, PRODUCT_LINK, THUMBNAIL } from '../tag/tag.model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    discountTag: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: '0 0.2rem'
    },
  })
);

interface IProps {
  data: IProduct;
  showPercentage?: boolean;
}

export default function ProductCard({
  data,
  showPercentage
}: IProps) {
  const classes = useStyles();

  return (
    <Card
    >
      <Link
        href={productUrl.detail(data).href}
        as={productUrl.detail(data).as}
        passHref
      >
        <Typography component='a' color='inherit'
          data-cy={PRODUCT_LINK}
        >
          <CardActionArea
            data-cy={PRODUCT_CARD}
            data-id={data.productId}
          >
            <CardMedia>
              {
                showPercentage &&
                <Button
                  variant='contained'
                  className={classes.discountTag}
                  component='div'
                  color='primary'
                >
                  <Typography
                    data-cy={PERCENTAGE}
                  >
                    {getDiscountPercentage(data)}
                  </Typography>
                  % off
                </Button>
              }
              <ImageComponent
                imageName={data.thumbnail}
                data-cy={THUMBNAIL}
              />
            </CardMedia>
            <CardContent>
              <Typography variant='subtitle1' gutterBottom noWrap
                component='h3'
                data-cy={NAME}
              >
                {data.name}
              </Typography>
              <Typography variant='subtitle2' gutterBottom
                component='h4'
                data-cy={DISCOUNTED_PRICE}
              >
                {getDiscountedPrice(data)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Typography>
      </Link>
    </Card>
  );
}
