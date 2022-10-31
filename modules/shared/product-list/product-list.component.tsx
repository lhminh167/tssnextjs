import { ImageList, ImageListItem } from "@mui/material";
import { isSmallWidth } from "../layout/layout.theme";
import { IProduct } from "../models/product.model";
import ProductCardComponent from "../product-card/product-card.component";

interface IProps {
  data: IProduct[];
}

export default function ProductListComponent({ data }: IProps) {
  const matches = isSmallWidth();

  return (
    <ImageList rowHeight={"auto"} cols={matches ? 4 : 2}>
      {data?.map((entry) => (
        <ImageListItem key={entry.productId}>
          <ProductCardComponent data={entry} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
