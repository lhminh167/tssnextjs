import { createStyles, GridList, GridListTile, makeStyles, Theme, useMediaQuery } from "@material-ui/core";
import { PaginatedList } from "../../shared/crud/crud.model";
import { IProduct } from "../../shared/models/product.model";
import ProductCarouselComponent from "../../shared/product-carousel/product-carousel.component";
import TopPanelProductCard from "./top-panel-card.component";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  data: PaginatedList<IProduct>;
}

export default function TopPanelComponent({ data }: Props) {
  const classes = useStyles({});
  const isMediumScreen = useMediaQuery("(min-width:426px)");
  const pageSize = isMediumScreen ? 4 : 2;

  return (
    <GridList
      cols={pageSize}
      cellHeight={'auto'}
    >
      {
        data.items
          .slice(0, isMediumScreen ? 6 : 3)
          .filter(e => e)
          .map((entry, index) =>
            index > 0 ? (
              <GridListTile
                key={entry.productId}
                cols={1}
              >
                <TopPanelProductCard data={entry} />
              </GridListTile>
            ) : (
                <GridListTile
                  key={entry.productId}
                  cols={isMediumScreen ? 3 : 2}
                >
                  <ProductCarouselComponent
                    data={data}
                    autoplay={3000}
                    card={TopPanelCarouselProductCard}
                  />
                </GridListTile>
              )
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