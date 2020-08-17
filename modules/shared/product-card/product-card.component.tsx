import { Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';
import { productUrl } from '../../product/filter/product-filter.model';
import { formatCurrency } from '../helpers/string.helper';
import Image from '../image/image';
import { IProduct } from '../models/product.model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  })
);

interface IProps {
  data: IProduct;
}

export default function ProductCard({ data }: IProps) {
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
          data-cy='productLink'
        >
          <CardActionArea
            data-cy='productCard'
          >
            <CardMedia>
              <Image
                imageName={data.thumbnail}
              />
            </CardMedia>
            <CardContent>
              <Typography variant='subtitle1' gutterBottom noWrap
                component='h3'
              >
                {data.name}
              </Typography>

              <Typography variant='subtitle2' gutterBottom
                component='h4'
              >
                {formatCurrency(data.price)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Typography>
      </Link>
    </Card>
  );
}
