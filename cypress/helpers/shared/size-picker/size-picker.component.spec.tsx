import { IAttributeValue } from "../../../../modules/shared/models/attribute-value.model";
import { SIZE } from "../../../../modules/shared/tag/tag.model";

// export default function SizePickerComponentTest(input: IAttributeValue[] = []) {
//     describe('SizePickerComponentTest', () => {
//         SizePickerTest(input);

//     });
// }

export function SizePickerTest(input: IAttributeValue[] = []) {
    cy.getEl(SIZE).should(($els) => {
        const sizes = input.filter(e => e.name === 'Size').map(e => e.value);
        const elsText = $els.toArray().map(el => el.innerText);

        expect(elsText).to.deep.eq(sizes);
    })
}
