import { ImageList, ImageListItem } from "@mui/material";
import { PaginatedList } from "../../shared/crud/crud.model";
import { isMediumWidth } from "../../shared/layout/layout.theme";
import { IProduct } from "../../shared/models/product.model";
import ProductCarouselComponent, {
  defaultAutoplay,
} from "../../shared/product-carousel/product-carousel.component";
import { CAROUSEL, PRODUCT_CARD, TOP_PANEL } from "../../shared/tag/tag.model";
import ProductGrid from "./top-panel-card.component";

interface Props {
  data: PaginatedList<IProduct>;
}

export default function TopPanelComponent({ data }: Props) {
  const matches = isMediumWidth();
  const pageSize = matches ? 4 : 2;

  return (
    <ImageList cols={pageSize} rowHeight={"auto"}>
      <ImageListItem cols={matches ? 3 : 2} data-cy={TOP_PANEL + CAROUSEL}>
        <ProductCarouselComponent
          data={data}
          autoplay={defaultAutoplay}
          card={ProductGrid}
        />
      </ImageListItem>
      {data.items.slice(0, matches ? 5 : 2).map((entry) => (
        <ImageListItem
          key={entry.productId}
          cols={1}
          data-cy={TOP_PANEL + PRODUCT_CARD}
        >
          <ProductGrid data={entry} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
