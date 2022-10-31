import { Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import createStyles from "@mui/styles/createStyles";
import { useState } from "react";
import {
  defaultProductSearchRequest,
  IProductSearchRequest,
} from "../../../product/filter/product-filter.model";
import { getProducts } from "../../../product/filter/product-filter.service";
import {
  PaginatedList,
  PaginationRequest,
} from "../../../shared/crud/crud.model";
import { ICategory } from "../../../shared/models/category.model";
import { IProduct } from "../../../shared/models/product.model";
import ProductHorizontalGallery from "../../../shared/product-horizontal-gallery/product-horizontal-gallery.component";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  // #region Properties (1)

  data: ICategory;

  // #endregion Properties (1)
}

export default function CategoryDetailProductListComponent({ data }: Props) {
  const classes = useStyles({});
  const [state, setState] = useState<PaginatedList<IProduct>>(data.product);
  const [choice, setChoice] = useState<IProductSearchRequest>({
    ...defaultProductSearchRequest,
    category: [data.name],
  });

  async function changePageIndex({ pageIndex, pageSize }: PaginationRequest) {
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
      output={changePageIndex}
      title={
        <Typography variant="h6" component="h2">
          Product Recommendations
        </Typography>
      }
    />
  );
}
