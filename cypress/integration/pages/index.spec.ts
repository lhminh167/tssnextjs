import TopPanelComponentTest from "../../component/product/top-panel/top-panel.component.spec";
import { HomePageMetadataComponentTest } from "../../component/product/home-page-metadata/home-page-metadata.component.spec";
import MostDiscountedProductGalleryComponentTest from "../../component/product/most-discounted/most-discounted-product-gallery.component.spec";
import NavbarComponentTest from "../../component/shared/navbar/navbar.component.spec";

describe('Home page', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  HomePageMetadataComponentTest();
  NavbarComponentTest();
  TopPanelComponentTest();
  MostDiscountedProductGalleryComponentTest();

});