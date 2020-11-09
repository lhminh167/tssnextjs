import { cySetAdminLoginToken } from "../../helpers/shared/helpers/auth.helper";
import { cyIt } from "../../helpers/shared/helpers/other.helper";
import { cyGetPages, getSitemapUrls } from "../../helpers/shared/sitemap/sitemap.component.spec";

cyIt.run('Sitemap -> Sitemap should include all pages of website #e2e-working', () => {
  cy.pipe(cyGetPages).then(urls =>
    getSitemapUrls().should('deep.equal', urls)
  );
});

cyIt.skip('Sitemap -> All pages listed in sitemap should be accessible #smoke #e2e-working', () => {
  cy
    .pipe(cySetAdminLoginToken)
    .pipe(getSitemapUrls)
    .each((res: any) => cy.visit(res.url))
});
