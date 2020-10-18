import { GridList, GridListTile, useMediaQuery } from '@material-ui/core';
import { PaginatedList } from '../../shared/crud/crud.model';
import { IProduct } from '../../shared/models/product.model';
import ProductCarouselComponent, { defaultAutoplay } from '../../shared/product-carousel/product-carousel.component';
import { CAROUSEL, PRODUCT_CARD, TOP_PANEL } from '../../shared/tag/tag.model';
import ProductGrid from './top-panel-card.component';
import theme from '../../shared/layout/layout.theme';

interface Props {
  data: PaginatedList<IProduct>;
}

export default function TopPanelComponent({ data }: Props) {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const pageSize = matches ? 4 : 2;

  return (
    <GridList
      cols={pageSize}
      cellHeight={'auto'}
    >
      <GridListTile
        cols={matches ? 3 : 2}
        data-cy={TOP_PANEL + CAROUSEL}
      >
        <ProductCarouselComponent
          data={data}
          autoplay={defaultAutoplay}
          card={ProductGrid}
        />
      </GridListTile>
      {
        data.items
          .slice(0, matches ? 5 : 2)
          .map(entry =>
            <GridListTile
              key={entry.productId}
              cols={1}
              data-cy={TOP_PANEL + PRODUCT_CARD}
            >
              <ProductGrid data={entry} />
            </GridListTile>
          )
      }
    </GridList>
  );
}
