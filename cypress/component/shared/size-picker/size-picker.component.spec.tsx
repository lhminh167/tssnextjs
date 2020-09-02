import { SIZE } from "../../../../modules/shared/tag/tag.model";
import { IAttributeValue } from "../../../unit/shared/models/attribute-value.model";

export default function SizePickerComponentTest(input: IAttributeValue[] = []) {
    describe('SizePickerComponentTest', () => {
        SizePickerComponentBasicTest(input);

    });
}

export function SizePickerComponentBasicTest(input: IAttributeValue[] = []) {
    describe('SizePickerComponentBasicTest', () => {
        cy.getEl(SIZE).should(($els) => {
            const sizes = input.filter(e => e.name === 'Size').map(e => e.value);
            const elsText = $els.toArray().map(el => el.innerText);
            expect(elsText).to.deep.eq(sizes);
        })

    });
}

function HandleChangeTest() {
}

function IconComponentTest(text: string) {
}

function CheckedIconComponentTest() {

}

function RadioGroupComponentTest() {

}