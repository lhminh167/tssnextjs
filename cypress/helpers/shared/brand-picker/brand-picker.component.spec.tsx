import { IProductFilterCategory } from "../../../../modules/product/filter/product-filter.model";
import { CATEGORY } from "../../../../modules/shared/tag/tag.model";

export function BrandPickerTest(input: IProductFilterCategory[] = []) {
    cy.getEl(CATEGORY).should(($els) => {
        const criteria = input.map(e => e.name);
        const elsText = $els.toArray().map(el => el.getAttribute('data-id'));
        expect(elsText).to.deep.eq(criteria);
    })
}

