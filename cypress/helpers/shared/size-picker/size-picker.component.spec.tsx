import { ProductFilterFilterEnum } from "../../../../modules/product/filter/product-filter.model";
import { IAttributeValue } from "../../../../modules/shared/models/attribute-value.model";
import { SIZE } from "../../../../modules/shared/tag/tag.model";

export function SizePickerTest(input: IAttributeValue[] = []) {
    cy.getEl(SIZE).should(($els) => {
        const sizes = input.filter(e => e.name === ProductFilterFilterEnum.Size).map(e => e.value);
        const elsText = $els.toArray().map(el => el.innerText);

        expect(elsText).to.deep.eq(sizes);
    })
}
