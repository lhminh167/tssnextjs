import { COLOR } from "../../../../modules/shared/tag/tag.model";
import { IAttributeValue } from "../../../../modules/shared/models/attribute-value.model";
import { ProductFilterFilterEnum } from "../../../../modules/product/filter/product-filter.model";

export function ColorPickerTest(input: IAttributeValue[] = []) {
    cy.getEl(COLOR).should(($els) => {
        const criteria = input.filter(e => e.name === ProductFilterFilterEnum.Color).map(e => e.value);
        const elsText = $els.toArray().map(el => el.getAttribute('data-id'));
        expect(elsText).to.deep.eq(criteria);
    })
}
