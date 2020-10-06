import { cySetAdminLoginToken } from "../../helpers/shared/helpers/auth.helper";
import { cyGetPages, getSitemapUrls } from "../../helpers/shared/sitemap/sitemap.component.spec";

it('Sitemap -> Sitemap should include all pages of website #working', () => {
  cy.pipe(cyGetPages).then(urls =>
    getSitemapUrls().should('deep.equal', urls)
  );
});

it.skip('Sitemap -> All pages listed in sitemap should be accessible #smoke', () => {
  cy
    .pipe(cySetAdminLoginToken)
    .pipe(getSitemapUrls)
    .each((res: any) => cy.visit(res.url))
});
