import { apiProductUrl, defaultProductSearchRequest, IProductSearchRequest, productUrl, SortByEnum } from "../../../modules/product/filter/product-filter.model";
import { getProducts } from "../../../modules/product/filter/product-filter.service";
import { defaultPaginationList, defaultPaginationRequest, HttpMethod, PaginatedList } from "../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../modules/shared/crud/crud.service";
import { IProduct } from "../../../modules/shared/models/product.model";
import { CATEGORY, COLOR, COUNT, DESCRIPTION, DISCOUNTED_PRICE, FIRST, LAST, NAME, NEXT, PREVIOUS, PRODUCT_CARD, PRODUCT_LINK, SEARCH_BOX, SIZE, SUBMIT } from "../../../modules/shared/tag/tag.model";
import { cyCreateProduct, cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import setupProductSortingTest, { getMaxPrice, getMinPrice, openProductFilter, ProductFilterDetailTest, ProductFilterListTest, ProductListCategoryTest, ProductListColorTest, ProductListSizeTest } from "../../helpers/product/filter/product-filter.component.spec";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { mockRandomProduct } from "../../helpers/shared/helpers/product.helper";
import { getRandomNumber, getRandomString, unformatCurrency } from "../../helpers/shared/helpers/string.helper";
import { ProductLinkTest } from "../../helpers/shared/product-card/product-card.component.spec";
import ProductListTest, { ProductListFirstPageButtonTest, ProductListFirstPageTest, ProductListLastPageButtonTest, ProductListNextPageButtonTest, ProductListPageInfoTest, ProductListPageSizeTest, ProductListPreviousPageButtonTest } from "../../helpers/shared/product-list/product-list.component.spec";

cyIt.run('Product Search Page -> Product Filter -> When user opens the Product Filter, then the panel\'s details should have correct values #priority-2-working #e2e-working', () => {
  cy.visit(productUrl.product).pipe(ProductFilterDetailTest)
});

cyIt.run('Product Search Page -> Search By Name -> When user types a keyword into the search box and press Enter key, then page should show products whose title containing keyword #priority-1-working #e2e-working', () => {
  const product = cyGetExistingProduct();
  cy.visit(productUrl.product).wait(4000);
  cy.getEl(SEARCH_BOX).type(product.name + '{enter}');
  cy.getEl(COUNT).should('have.text', 1);
  cy.getEl(PRODUCT_CARD).first().within(() => {
    cy.getEl(NAME).should('have.text', product.name);
  });
});

cyIt.run('Product Search Page -> Search By Description -> When user types a keyword into the search box and press Enter key, then page should show products whose description containing keyword #priority-2-working #e2e-working', () => {
  const product = cyGetExistingProduct();
  cy.visit(productUrl.product).wait(4000);
  cy.getEl(SEARCH_BOX).type(product.description + '{enter}');
  cy.getEl(COUNT).should('have.text', 1);
  cy.getEl(PRODUCT_LINK).first().click().getLink().load();
  cy.getEl(DESCRIPTION).should('have.text', product.description);
});

cyIt.run('Product Search Page -> Search From Other Page -> When user is not on Product Search Page and enters a search keyword, then user should be redirected to Product Search Page #priority-2-working #e2e-working', () => {
  const text = getRandomString(5);
  cy.visit('/').wait(4000);
  cy.getEl(SEARCH_BOX).type(text + '{enter}');
  cy.load(productUrl.search({ ...defaultProductSearchRequest, keyword: text }));
})

cyIt.run('Product Search Page -> Search By Category -> should show products which belongs to the chosen category #priority-1-working #e2e-working #visual-working', () => {

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

cyIt.run('Product Search Page -> Search By Price Range -> should show products which belongs to the chosen price range #priority-2-working #e2e-working', () => {

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

cyIt.run('Product Search Page -> Search By Size -> When user chooses a size and searches, then result products should have that size #priority-2-working #e2e-working', () => {

  cy.visit(productUrl.product).pipe(openProductFilter);
  cy.getEl(SIZE).last().click().invoke('attr', 'data-id').as('size');
  cy.getEl(SUBMIT).click();
  cy.get('@size')
    .chain(size => productUrl.search({ ...defaultProductSearchRequest, size }))
    .load();
  cy.getEl(COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
  cy.get('@size').chain(ProductListSizeTest);


});

cyIt.run('Product Search Page -> Search By Color -> When user chooses a color and searches, then result products should have that color #priority-2-working #e2e-working', () => {
  cy.visit(productUrl.product).pipe(openProductFilter);
  cy.getEl(COLOR).last().click().invoke('attr', 'data-id').as('color');
  cy.getEl(SUBMIT).click();
  cy.get('@color')
    .chain(color => productUrl.search({ ...defaultProductSearchRequest, color }))
    .load();
  cy.getEl(COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
  cy.get('@color').chain(ProductListColorTest);

});


cyIt.run('Product Search Page -> Sort By Ascending Name -> When user sorts products by name in ascending order, then result products should be sorted by name in ascending order #priority-2-working #e2e-working', () => {

  setupProductSortingTest({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.Name,
    isDescending: false
  });

  cy.getEl(NAME).should(els => {
    const data = els.toArray().map(e => e.innerText.toLowerCase());
    const condition = Cypress._.orderBy(data, e => e, ['asc']);
    expect(data).to.deep.equal(condition);
  })
});



cyIt.run('Product Search Page -> Sort By Descending Price -> When user sorts products by price in descending order, then result products should be sorted by price in descending order #priority-2-working #e2e-working', () => {

  setupProductSortingTest({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.Price,
    isDescending: true
  });

  cy.getEl(DISCOUNTED_PRICE).should(els => {
    const data = els.toArray().map(e => unformatCurrency(e.innerText));
    const condition = Cypress._.orderBy(data, e => e, ['desc']);
    expect(data).to.deep.equal(condition);
  })
});


cyIt.run('Product Search Page -> Sort By Ascending Price -> When user sorts products by price in ascending order, then result products should be sorted by price in ascending order #priority-2-working #e2e-working', () => {
  setupProductSortingTest({
    ...defaultProductSearchRequest,
    sortBy: SortByEnum.Price,
    isDescending: false
  });

  cy.getEl(DISCOUNTED_PRICE).should(els => {
    const data = els.toArray().map(e => unformatCurrency(e.innerText));
    const condition = Cypress._.orderBy(data, e => e, ['asc']);
    expect(data).to.deep.equal(condition);
  })
});

cyIt.run('Product Search Page -> Pagination -> When user clicks First Page, Previous Page, Next Page, and Last Page buttons, then the corresponding page is shown #priority-4-working #e2e-working', () => {
  cy
    .server().route({ url: '/_next/**/product.json**', method: HttpMethod.GET })
    .as('route')
    .visit(productUrl.product)
    .wrap({ ...defaultProductSearchRequest, sortBy: SortByEnum.Newest, ...defaultPaginationRequest })
    .pipe(getProducts).its('content.items').then(items => {
      const count = items.length;
      const pageSize = defaultProductSearchRequest.pageSize;
      const lastPageIndex = Math.max(0, Math.ceil(count / pageSize) - 1);
      cy
        .wrap(items.slice(0, pageSize))
        .chain(ProductListTest)
        .pipe(ProductListFirstPageTest)

        .getEl(NEXT).click({ force: true })
        .wrap(items.slice(pageSize, pageSize * 2))
        .chain(ProductListTest)
        .pipe(ProductListNextPageButtonTest)

        .getEl(LAST).click({ force: true })
        .then(() => items.slice(pageSize * lastPageIndex, count))
        .chain(ProductListTest)
        .pipe(ProductListLastPageButtonTest)

        .then<PaginatedList<IProduct>>(() => ({
          ...defaultPaginationList,
          items: items,
          count,
          pageSize,
          pageIndex: lastPageIndex
        }))
        .pipe(ProductListPageInfoTest)

        .getEl(PREVIOUS).click({ force: true })
        .then(() => items.slice(pageSize * lastPageIndex - pageSize, pageSize * lastPageIndex - 1))
        .chain(ProductListTest)
        .pipe(ProductListPreviousPageButtonTest)

        .getEl(FIRST).click({ force: true })
        .then(() => items.slice(0, pageSize))
        .chain(ProductListTest)
        .pipe(ProductListFirstPageButtonTest)
    })
});

cyIt.run('Product Search Page -> Change Page Size -> When user changes number of items per page size, then number of products shown on the page should be equal to the chosen number #priority-4-working #e2e-working', () => {
  cy
    .server().route({ url: '/_next/**/product.json**', method: HttpMethod.GET })
    .as('route')
    .visit(productUrl.product)

    .wrap(ProductFilterListTest)
    .pipe(ProductListPageSizeTest)

    .pipe(ProductLinkTest)
});
