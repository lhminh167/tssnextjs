import { apiProductUrl, defaultProductSearchRequest, productUrl, SortByEnum } from "../../../modules/product/filter/product-filter.model";
import { getProducts } from "../../../modules/product/filter/product-filter.service";
import { CATEGORY, COLOR, COUNT, DESCRIPTION, DISCOUNTED_PRICE, FILTER, MAX_PRICE, MIN_PRICE, NAME, PRICE, PRODUCT_CARD, PRODUCT_LINK, SEARCH_BOX, SIZE, SUBMIT, tag } from "../../../modules/shared/tag/tag.model";
import { cyGetExistingProduct } from "../../helpers/product/create/create-product.component.spec";
import setupProductSortingTest, { ProductListCategoryTest, ProductListColorTest, ProductListSizeTest } from "../../helpers/product/filter/product-filter.component.spec";
import { getRandomNumber, getRandomString, unformatCurrency } from "../../helpers/shared/helpers/string.helper";

it('Product Search Page -> Search By Name -> When user types a keyword into the search box and press Enter key, then page should show products whose title containing keyword #working', () => {
  const product = cyGetExistingProduct();
  cy.visit(productUrl.product);
  cy.getEl(SEARCH_BOX).type(product.name + '{enter}');
  cy.getEl(COUNT).should('have.text', 1);
  cy.getEl(PRODUCT_CARD).first().within(() => {
    cy.getEl(NAME).should('have.text', product.name);
  });
});

it('Product Search Page -> Search By Description -> When user types a keyword into the search box and press Enter key, then page should show products whose description containing keyword #working', () => {
  const product = cyGetExistingProduct();
  cy.visit(productUrl.product);
  cy.getEl(SEARCH_BOX).type(product.description + '{enter}');
  cy.getEl(COUNT).should('have.text', 1);
  cy.getEl(PRODUCT_LINK).first().click().getLink().load();
  cy.getEl(DESCRIPTION).should('have.text', product.description);
});

it('Product Search Page -> Search From Other Page -> When user is not on Product Search Page and enters a search keyword, then user should be redirected to Product Search Page #working', () => {
  const text = getRandomString(5);
  cy.visit('/');
  cy.getEl(SEARCH_BOX).type(text + '{enter}');
  cy.load(productUrl.search({ ...defaultProductSearchRequest, keyword: text }));
})

it('Product Search Page -> Search By Category -> should show products which belongs to the chosen category', () => {

  cy.visit(productUrl.product);
  cy.getEl(COUNT).click();
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

it('Product Search Page -> Search By Price Range -> should show products which belongs to the chosen price range', () => {

  cy.visit(productUrl.product);
  cy.getEl(COUNT).click();
  cy.getEl(MIN_PRICE).invoke('text').then(minLimit => {
    cy.getEl(MAX_PRICE).invoke('text').then(maxLimit => {

      const minPrice = getRandomNumber(unformatCurrency(minLimit), unformatCurrency(maxLimit));
      const maxPrice = getRandomNumber(unformatCurrency(minLimit), unformatCurrency(maxLimit));

      cy.getEl(tag(PRICE, '', FILTER)).within(() => {
        cy.get('[data-index="1"] ')
          .focus()
          .trigger("mousedown")
          .trigger("mousemove", { which: 1, pageX: maxPrice })

        cy.get('[data-index="0"] ')
          .focus()
          .trigger("mousedown")
          .trigger("mousemove", { which: 1, pageX: minPrice })

      })
    })
  })

});

it('Product Search Page -> Search By Size -> should show products which belongs to the chosen price range #working', () => {

  cy.visit(productUrl.product);
  cy.getEl(COUNT).click();
  cy.getEl(SIZE).last().click().invoke('attr', 'data-id').as('size');
  cy.getEl(SUBMIT).click();
  cy.get('@size')
    .chain(size => productUrl.search({ ...defaultProductSearchRequest, size }))
    .load();
  cy.getEl(COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
  cy.get('@size').chain(ProductListSizeTest);


});

it('Product Search Page -> Search By Color -> should show products which belongs to the chosen price range #working', () => {
  cy.visit(productUrl.product);
  cy.getEl(COUNT).click();
  cy.getEl(COLOR).last().click().invoke('attr', 'data-id').as('color');
  cy.getEl(SUBMIT).click();
  cy.get('@color')
    .chain(color => productUrl.search({ ...defaultProductSearchRequest, color }))
    .load();
  cy.getEl(COUNT).invoke('text').then(parseFloat).should('be.gt', 0);
  cy.get('@color').chain(ProductListColorTest);

});


it('Product Search Page -> Sort By Ascending Name -> should show products which belongs to the chosen price range #working', () => {

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



it('Product Search Page -> Sort By Descending Price -> should show products which belongs to the chosen price range #working', () => {

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


it('Product Search Page -> Sort By Ascending Price -> should show products which belongs to the chosen price range #working', () => {
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

