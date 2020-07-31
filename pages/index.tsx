import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import BestSellingProductGalleryComponent from "../modules/product/best-selling/best-selling-product.component";
import { getHomepageProducts } from "../modules/product/filter/product-filter.service";
import TopPanelComponent from "../modules/product/top-panel/top-panel.component";
import TopRatedProductGalleryComponent from "../modules/product/top-rated/top-rated-product-gallery.component";
import ErrorBoundary from "../modules/shared/error-boundary/error-boundary.component";
import { HomepageProducts } from "../modules/shared/models/product.model";
import MostDiscountedProductGallery from "../modules/product/most-discounted/most-discounted-product-gallery.component";
import NewestProductList from "../modules/product/newest/newest-product-list.component";
import { HomePageMetadataComponent } from "../modules/product/home-page-metadata/home-page-metadata.component";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface Props {
  data: HomepageProducts
}

export default function ProductSearchPage({
  data
}: Props) {
  const classes = useStyles({});

  return data && (
    <Container>
      <ErrorBoundary>
        <TopPanelComponent data={data.topPanel} />
      </ErrorBoundary>
      <ErrorBoundary>
        <MostDiscountedProductGallery data={data.mostDiscounted} />
      </ErrorBoundary>
      <ErrorBoundary>
        <BestSellingProductGalleryComponent data={data.bestSelling} />
      </ErrorBoundary>
      <ErrorBoundary>
        <TopRatedProductGalleryComponent data={data.topRated} />
      </ErrorBoundary>
      <ErrorBoundary>
        <NewestProductList data={data.newest} />
      </ErrorBoundary>
      <ErrorBoundary>
        <HomePageMetadataComponent data={data} />
      </ErrorBoundary>
    </Container>
  );
}

ProductSearchPage.getInitialProps = async function () {

  const response = await getHomepageProducts();

  return {
    data: response.content
  };
};
