import { apiProductUrl } from "../../../../modules/product/filter/product-filter.model";
import { IResponse, PaginatedList } from "../../../../modules/shared/crud/crud.model";
import { getUrl } from "../../../../modules/shared/crud/crud.service";
import { IProduct } from "../../../../modules/shared/models/product.model";
import { FIRST, LAST, NEXT, PREVIOUS } from "../../../../modules/shared/tag/tag.model";
import ProductCardDetailTest from "../product-card/product-card.component.spec";

export default function ProductListTest(input: IProduct[]) {
  input.forEach(el => ProductCardDetailTest(el));
  return cy;
}

export function ProductListPaginationTest(testFunction: any) {

  cy.pipe(ProductListFirstPageTest)
  cy.getEl(NEXT).click().should('exist')
    .pipe(testFunction)
    .pipe(ProductListNextPageButtonTest)
  cy.getEl(LAST).click().should('exist')
    .pipe(testFunction)
    .pipe(ProductListLastPageButtonTest)
  cy.getEl(PREVIOUS).click().should('exist')
    .pipe(testFunction)
    .pipe(ProductListPreviousPageButtonTest)
  cy.getEl(FIRST).click().should('exist')
    .pipe(testFunction)
    .pipe(ProductListFirstPageButtonTest)

  return cy;
}

export function ProductListPageInfoTest(input: PaginatedList<any>) {
  const lastPageIndex = Math.max(0, Math.ceil(input.count / input.pageSize) - 1);
  const fromItemIndex = input.pageIndex * input.pageSize + 1;
  const toItemIndex = input.pageIndex === lastPageIndex ?
    input.count :
    (input.pageIndex + 1) * input.pageSize;

  cy.get('.MuiTablePagination-caption')
    .should('have.text', `Items per page:${fromItemIndex}-${toItemIndex} of ${input.count}`)
  return cy;
}

export function ProductListPageSizeTest(testFunction: any) {
  cy.get('.MuiTablePagination-select').should('exist').click().wait(2000)
  cy.get('.MuiTablePagination-menuItem').should('exist').last().click()
    .pipe(testFunction)
  return cy;
}

export function ProductListFirstPageTest() {
  cy.getEl(FIRST).should('have.class', 'Mui-disabled')
  cy.getEl(PREVIOUS).should('have.class', 'Mui-disabled')
  cy.getEl(NEXT).should('not.have.class', 'Mui-disabled')
  cy.getEl(LAST).should('not.have.class', 'Mui-disabled')
  return cy;
}

export function ProductListNextPageButtonTest() {
  cy.getEl(FIRST).should('not.have.class', 'Mui-disabled')
  cy.getEl(PREVIOUS).should('not.have.class', 'Mui-disabled')
  cy.getEl(NEXT).should('not.have.class', 'Mui-disabled')
  cy.getEl(LAST).should('not.have.class', 'Mui-disabled')
  return cy;
}

export function ProductListLastPageButtonTest() {
  cy.getEl(NEXT).should('have.class', 'Mui-disabled')
  cy.getEl(LAST).should('have.class', 'Mui-disabled')
  cy.getEl(FIRST).should('not.have.class', 'Mui-disabled')
  cy.getEl(PREVIOUS).should('not.have.class', 'Mui-disabled')
  return cy;
}

export function ProductListPreviousPageButtonTest() {
  cy.getEl(NEXT).should('not.have.class', 'Mui-disabled')
  cy.getEl(LAST).should('not.have.class', 'Mui-disabled')
  cy.getEl(PREVIOUS).should('not.have.class', 'Mui-disabled')
  cy.getEl(FIRST).should('not.have.class', 'Mui-disabled')
  return cy;
}

export function ProductListFirstPageButtonTest() {
  cy.getEl(NEXT).should('not.have.class', 'Mui-disabled')
  cy.getEl(LAST).should('not.have.class', 'Mui-disabled')
  cy.getEl(PREVIOUS).should('have.class', 'Mui-disabled')
  cy.getEl(FIRST).should('have.class', 'Mui-disabled')
  return cy;
}