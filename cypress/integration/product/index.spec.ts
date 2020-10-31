import { apiProductUrl, defaultProductSearchRequest, IProductSearchRequest, productUrl, SortByEnum } from "../../../modules/product/filter/product-filter.model";
import { getFilter, getProducts } from "../../../modules/product/filter/product-filter.service";
import { getUrl } from "../../../modules/shared/crud/crud.service";
import { CATEGORY, COLOR, COUNT, DESCRIPTION, DISCOUNTED_PRICE, FILTER, MAX_PRICE, MIN_PRICE, NAME, PRICE, PRODUCT_CARD, PRODUCT_LINK, SEARCH_BOX, SIZE, SUBMIT, tag } from "../../../modules/shared/tag/tag.model";
import { cyCreateProduct, cyGetExistingProduct, cyGetFilter } from "../../helpers/product/create/create-product.component.spec";
import setupProductSortingTest, { getMaxPrice, getMinPrice, getRandomPrice, openProductFilter, ProductListCategoryTest, ProductListColorTest, ProductListSizeTest } from "../../helpers/product/filter/product-filter.component.spec";
import { mockRandomProduct } from "../../helpers/shared/helpers/product.helper";
import { getRandomNumber, getRandomString, unformatCurrency } from "../../helpers/shared/helpers/string.helper";

it('Product Search Page -> Search By Name -> When user types a keyword into the search box and press Enter key, then page should show products whose title containing keyword #e2e-working', () => {
  const product = cyGetExistingProduct();
  cy.visit(productUrl.product).wait(4000);
  cy.getEl(SEARCH_BOX).type(product.name + '{enter}');
  cy.getEl(COUNT).should('have.text', 1);
  cy.getEl(PRODUCT_CARD).first().within(() => {
    cy.getEl(NAME).should('have.text', product.name);
  });
});

it('Product Search Page -> Search By Description -> When user types a keyword into the search box and press Enter key, then page should show products whose description containing keyword #e2e-working', () => {
  const product = cyGetExistingProduct();
  cy.visit(productUrl.product).wait(4000);
  cy.getEl(SEARCH_BOX).type(product.description + '{enter}');
  cy.getEl(COUNT).should('have.text', 1);
  cy.getEl(PRODUCT_LINK).first().click().getLink().load();
  cy.getEl(DESCRIPTION).should('have.text', product.description);
});

it('Product Search Page -> Search From Other Page -> When user is not on Product Search Page and enters a search keyword, then user should be redirected to Product Search Page #e2e-working', () => {
  const text = getRandomString(5);
  cy.visit('/').wait(4000);
  cy.getEl(SEARCH_BOX).type(text + '{enter}');
  cy.load(productUrl.search({ ...defaultProductSearchRequest, keyword: text }));
})

it('Product Search Page -> Search By Category -> should show products which belongs to the chosen category #e2e-working #visual-working', () => {

  cy.visit(productUrl.product).pipe(openProductFilter);
  cy.getEl(CATEGORY).takeScreenShot('Product Search Page');
  cy.getEl(CATEGORY).last().click().invoke('attr', 'data-id').as('category');
  cy.getEl(SUBMIT).click();
  cy.getEl(COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
  cy
    .get('@category')
    .then((category: any) => ({
      ...defaultProductSearchRequest,
      category: [category]
    }))
    .pipe(productUrl.search).load()
  cy.get('@category').chain(ProductListCategoryTest);
});

it('Product Search Page -> Search By Price Range -> should show products which belongs to the chosen price range #e2e-working', () => {

  const minPrice = getMinPrice();
  const maxPrice = getMaxPrice();

  const product = mockRandomProduct();
  product.discountedPrice = getRandomNumber(minPrice, maxPrice);
  product.price = product.discountedPrice * 1.1;

  const request: IProductSearchRequest = {
    ...defaultProductSearchRequest,
    minPrice,
    maxPrice
  };

  cy
    .server().route({ url: getUrl(apiProductUrl.search(request)) }).as('route')
    .wrap(product).pipe(cyCreateProduct)
    .visit(productUrl.search(request))

  cy
    .getEl(DISCOUNTED_PRICE).each(el =>
      cy.wrap(el).invoke('text').pipe(unformatCurrency).should('be.greaterThan', minPrice).should('be.lessThan', maxPrice)
    )
});

it('Product Search Page -> Search By Size -> When user chooses a size and searches, then result products should have that size #e2e-working', () => {

  cy.visit(productUrl.product).pipe(openProductFilter);
  cy.getEl(SIZE).last().click().invoke('attr', 'data-id').as('size');
  cy.getEl(SUBMIT).click();
  cy.get('@size')
    .chain(size => productUrl.search({ ...defaultProductSearchRequest, size }))
    .load();
  cy.getEl(COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
  cy.get('@size').chain(ProductListSizeTest);


});

it('Product Search Page -> Search By Color -> When user chooses a color and searches, then result products should have that color #e2e-working', () => {
  cy.visit(productUrl.product).pipe(openProductFilter);
  cy.getEl(COLOR).last().click().invoke('attr', 'data-id').as('color');
  cy.getEl(SUBMIT).click();
  cy.get('@color')
    .chain(color => productUrl.search({ ...defaultProductSearchRequest, color }))
    .load();
  cy.getEl(COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
  cy.get('@color').chain(ProductListColorTest);

});


it('Product Search Page -> Sort By Ascending Name -> When user sorts products by name in ascending order, then result products should be sorted by name in ascending order #e2e-working', () => {

  setupProductSortingTest({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.Name,
    isDescending: false
  });

  cy.getEl(NAME).should(els => {
    const data = els.toArray().map(e => e.innerText);
    const condition = Cypress._.orderBy(data, e => e, ['asc']);
    expect(data).to.deep.equal(condition);
  })
});



it('Product Search Page -> Sort By Descending Price -> When user sorts products by price in descending order, then result products should be sorted by price in descending order #e2e-working', () => {

  setupProductSortingTest({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.Price,
    isDescending: true
  });

  cy.getEl(DISCOUNTED_PRICE).should(els => {
    const data = els.toArray().map(e => e.innerText);
    const condition = Cypress._.orderBy(data, e => e, ['desc']);
    expect(data).to.deep.equal(condition);
  })
});


it('Product Search Page -> Sort By Ascending Price -> When user sorts products by price in ascending order, then result products should be sorted by price in ascending order #e2e-working', () => {
  setupProductSortingTest({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.Price,
    isDescending: false
  });

  cy.getEl(DISCOUNTED_PRICE).should(els => {
    const data = els.toArray().map(e => e.innerText);
    const condition = Cypress._.orderBy(data, e => e, ['asc']);
    expect(data).to.deep.equal(condition);
  })
});

