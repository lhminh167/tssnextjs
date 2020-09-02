import { COLOR } from "../../../../modules/shared/tag/tag.model";
import { IAttributeValue } from "../../../../modules/shared/models/attribute-value.model";


export function ColorPickerComponentTest() {

}


export function ColorPickerComponentBasicTest(input: IAttributeValue[] = []) {
    describe('ColorPickerComponentBasicTest', () => {
        cy.getEl(COLOR).should(($els) => {
            const sizes = input.filter(e => e.name === 'Color').map(e => e.value);
            const elsText = $els.toArray().map(el => el.getAttribute('data-color'));
            expect(elsText).to.deep.eq(sizes);
        })

    });
}

