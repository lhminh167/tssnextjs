import { ButtonBase, ImageListItemBar, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import Link from "next/link";
import { Fragment } from "react";
import ImageComponent from "../../shared/image/image.component";
import { w100 } from "../../shared/layout/layout.style";
import {
  getDiscountedPrice,
  IProduct,
} from "../../shared/models/product.model";
import {
  DISCOUNTED_PRICE,
  NAME,
  PRODUCT_CARD,
  PRODUCT_LINK,
} from "../../shared/tag/tag.model";
import { productUrl } from "../filter/product-filter.model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // discount: {
    //     marginRight: theme.spacing(1),
    //     color: themeColor.white,
    //     borderColor: themeColor.white
    // },
    link: {
      ...w100,
    },
  })
);

interface Props {
  data: IProduct;
  imageStyles?: any;
}

export default function ProductGrid({ data, imageStyles }: Props) {
  const classes = useStyles({});
  return (
    <Fragment>
      <Link
        href={productUrl.detail(data).href}
        as={productUrl.detail(data).as}
        passHref
      >
        <ButtonBase
          className={classes.link}
          component="a"
          data-cy={PRODUCT_LINK}
        >
          <ImageComponent
            imageName={data.thumbnail}
            imageStyles={{
              ...imageStyles,
              height: "250px",
            }}
          />
        </ButtonBase>
      </Link>
      <ImageListItemBar
        data-cy={PRODUCT_CARD}
        data-id={data.productId}
        title={
          <Typography component="h2" variant="subtitle1" data-cy={NAME}>
            {data.name}
          </Typography>
        }
        subtitle={
          <Typography
            component="h3"
            variant="subtitle1"
            data-cy={DISCOUNTED_PRICE}
          >
            {getDiscountedPrice(data)}
          </Typography>
        }
      />
    </Fragment>
  );
}
