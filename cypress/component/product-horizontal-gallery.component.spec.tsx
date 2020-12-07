import { NEXT, PREVIOUS } from '../../modules/shared/tag/tag.model';
import MostDiscountedProductGalleryComponentMock from '../helpers/product/most-discounted/most-discounted-product-gallery.component.mock';
import { cyIt } from '../helpers/shared/helpers/other.helper';
import { cyMount, CyMountProps } from '../helpers/shared/layout/layout.component.spec';

cyIt.run('Product Horizontal Gallery Component -> When user click a navigation button, then gallery shows the corresponding slide. When there is no corresponding slide, then the corresponding navigation button is disabled #priority-2-working #unit-working', () => {
    cy
        .fixture('most-discounted-products.json').its('content')
        .then(res => ({ ...res, count: 12 }))
        .then<CyMountProps>(res => ({
            Component: MostDiscountedProductGalleryComponentMock,
            props: { data: res }
        }))
        .pipe(cyMount)
    cy.getEl(PREVIOUS).should('be.disabled');
    cy.getEl(NEXT).click();
    cy.getEl(PREVIOUS).should('not.be.disabled');
    cy.getEl(NEXT).click().should('be.disabled');
})
