import { GridList, GridListTile, useMediaQuery } from '@material-ui/core';
import { PaginatedList } from '../../shared/crud/crud.model';
import { IProduct } from '../../shared/models/product.model';
import ProductCarouselComponent from '../../shared/product-carousel/product-carousel.component';
import { TOP_PANEL } from '../../shared/tag/tag.model';
import TopPanelProductCard from './top-panel-card.component';
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
      data-cy={TOP_PANEL}
    >
      <GridListTile
        cols={matches ? 3 : 2}
      >
        <ProductCarouselComponent
          data={data}
          autoplay={3000}
          card={TopPanelCarouselProductCard}
        />
      </GridListTile>
      {
        data.items
          .slice(1, matches ? 6 : 3)
          .map((entry, index) =>
            <GridListTile
              key={entry.productId}
              cols={1}
            >
              <TopPanelProductCard data={entry} />
            </GridListTile>
          )
      }
    </GridList>
  );
}

function TopPanelCarouselProductCard({
  data
}) {
  return (
    <TopPanelProductCard
      data={data}
    />
  )
}