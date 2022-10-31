import Container from "@mui/material/Container";
// import LazyHydrate from "react-lazy-hydration";
import BestSellingProductGalleryComponent from '../modules/product/best-selling/best-selling-product.component';
import { getHomepageProducts } from '../modules/product/filter/product-filter.service';
import { HomePageMetadataComponent } from '../modules/product/home-page-metadata/home-page-metadata.component';
import MostDiscountedProductGalleryComponent from '../modules/product/most-discounted/most-discounted-product-gallery.component';
import NewestProductListComponent from '../modules/product/newest/newest-product-list.component';
import TopPanelComponent from '../modules/product/top-panel/top-panel.component';
import TopRatedProductGalleryComponent from '../modules/product/top-rated/top-rated-product-gallery.component';
import ErrorBoundary from '../modules/shared/error-boundary/error-boundary.component';
import { revalidateInterval } from "../modules/shared/helpers/http.helper";
import { HomepageProducts } from '../modules/shared/models/product.model';

interface Props {
  data: HomepageProducts
}

export default function ProductSearchPage({
  data
}: Props) {

  return data && (
    <Container>
      <ErrorBoundary>
        <TopPanelComponent data={data.topPanel} />
      </ErrorBoundary>
      <ErrorBoundary>
        {/* <LazyHydrate whenVisible> */}
        <MostDiscountedProductGalleryComponent data={data.mostDiscounted} />
        {/* </LazyHydrate> */}
      </ErrorBoundary>
      <ErrorBoundary>
        {/* <LazyHydrate whenVisible> */}
        <BestSellingProductGalleryComponent data={data.bestSelling} />
        {/* </LazyHydrate> */}
      </ErrorBoundary>
      <ErrorBoundary>
        {/* <LazyHydrate whenVisible> */}
        <TopRatedProductGalleryComponent data={data.topRated} />
        {/* </LazyHydrate> */}
      </ErrorBoundary>
      <ErrorBoundary>
        {/* <LazyHydrate whenVisible> */}
        <NewestProductListComponent data={data.newest} />
        {/* </LazyHydrate> */}
      </ErrorBoundary>
      <ErrorBoundary>
        <HomePageMetadataComponent data={data} />
      </ErrorBoundary>
    </Container>
  );
}

export async function getStaticProps() {

  const response = await getHomepageProducts();

  return {
    props: { data: response.content },
    revalidate: revalidateInterval
  }
}