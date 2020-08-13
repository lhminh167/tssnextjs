import { Theme, Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import React from "react";
import { IProduct } from "../models/product.model";
import Image from "../image/image";
import { toUrl, formatCurrency } from "../helpers/string.helper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // textAlign: "left"
      // boxShadow:
      //   "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
    }
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
        href={{
          pathname: "/product/[productName]",
          query: {
            productId: data.productId
          }
        }}
        as={`/product/${toUrl(data.name)}?productId=${data.productId}`}
        passHref
      >
        <Typography component="a" color="inherit">
          <CardActionArea className={classes.root}>
            <CardMedia>
              <Image
                imageName={data.thumbnail}
              />
            </CardMedia>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom noWrap
                component='h3'
              >
                {data.name}
              </Typography>

              <Typography variant="subtitle2" gutterBottom
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
