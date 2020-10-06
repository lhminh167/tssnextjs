export const attributeValueUrl = 'attributes';

export interface IAttributeValue {
    name: string;
    attributeValueId: number;
    attributeId: number;
    value: string;
}

export const defaultAttributeValue: IAttributeValue = {
    name: '',
    attributeValueId: 0,
    attributeId: 0,
    value: ''
}