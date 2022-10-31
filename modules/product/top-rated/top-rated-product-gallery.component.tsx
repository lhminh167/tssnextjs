import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { useState } from "react";
import { PaginatedList, PaginationRequest } from "../../shared/crud/crud.model";
import { IProduct } from "../../shared/models/product.model";
import ProductHorizontalGallery from "../../shared/product-horizontal-gallery/product-horizontal-gallery.component";
import { PremiumBadgeIcon } from "../../shared/svg/svg.component";
import { TOP_RATED } from "../../shared/tag/tag.model";
import {
  defaultProductSearchRequest,
  IProductSearchRequest,
  SortByEnum,
} from "../filter/product-filter.model";
import { getProducts } from "../filter/product-filter.service";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  data: PaginatedList<IProduct>;
}

export default function TopRatedProductGalleryComponent({ data }: Props) {
  const classes = useStyles({});
  const [state, setState] = useState<PaginatedList<IProduct>>(data);
  const [choice, setChoice] = useState<IProductSearchRequest>({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.TopRated,
  });

  async function change({ pageIndex, pageSize }: PaginationRequest) {
    const newChoice: IProductSearchRequest = {
      ...choice,
      pageIndex,
      pageSize,
    };
    const response = await getProducts(newChoice);
    setState(response.content);
    setChoice(newChoice);
  }

  return (
    <ProductHorizontalGallery
      data={state}
      output={change}
      titleIcon={<PremiumBadgeIcon color="primary" fontSize="large" />}
      title={
        <Typography variant="h6" component="h2">
          Top Rated Products
        </Typography>
      }
      // seeMore={
      //     <Link
      //         href='/product'
      //         as='/product'
      //         passHref
      //     >
      //         <Button
      //             component='a'
      //         >
      //             See All Top Rated Products
      //         </Button>
      //     </Link>
      // }
      galleryTestId={TOP_RATED}
    />
  );
}
