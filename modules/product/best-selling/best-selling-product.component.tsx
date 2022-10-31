import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { useState } from "react";
import { PaginatedList, PaginationRequest } from "../../shared/crud/crud.model";
import { IProduct } from "../../shared/models/product.model";
import ProductHorizontalGallery from "../../shared/product-horizontal-gallery/product-horizontal-gallery.component";
import { BEST_SELLING } from "../../shared/tag/tag.model";
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

export default function BestSellingProductGalleryComponent({ data }: Props) {
  const classes = useStyles({});
  const [state, setState] = useState<PaginatedList<IProduct>>(data);
  const [choice, setChoice] = useState<IProductSearchRequest>({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.BestSelling,
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
      titleIcon={
        <EmojiEventsIcon
          color="primary"
          style={{
            fontSize: "3rem",
          }}
        />
      }
      title={
        <Typography variant="h6" component="h2">
          Best Sellers
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
      //             See All Best Selling Products
      //         </Button>
      //     </Link>
      // }
      galleryTestId={BEST_SELLING}
    />
  );
}
