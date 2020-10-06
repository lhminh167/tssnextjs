import { ProductFilterFilterEnum } from '../../product/filter/product-filter.model';
import { IAttributeValue } from '../models/attribute-value.model';

export function encodeAttributes(attributeList: IAttributeValue[]): string {
    const attributes: string = attributeList.map(a => a.name).join('/');
    const attributeValues: string = attributeList.map(a => a.value).join('/');
    return attributes + ':' + attributeValues;
}

export function decodeAttributes(attributeList: string): IAttributeValue[] {
    const attributes = attributeList?.split(':');
    const name = attributes[0].split('/');
    const value = attributes[1].split('/');
    const attributePairs: IAttributeValue[] = [];
    for (let i = 0; i < attributes.length; i++) {
        attributePairs.push({
            name: name[i],
            value: value[i],
            attributeId: 0,
            attributeValueId: 0
        });
    }
    return attributePairs;
}

export function getCartItemColor(input: IAttributeValue[]) {
    return input.find(e => e.name === ProductFilterFilterEnum.Color)?.value;
}

export function getCartItemSize(input: IAttributeValue[]) {
    return input.find(e => e.name === ProductFilterFilterEnum.Size)?.value;
}

export function getColors(input: IAttributeValue[]) {
    return input.filter(e => e.name === ProductFilterFilterEnum.Color);
}

export function getSizes(input: IAttributeValue[]) {
    return input.filter(e => e.name === ProductFilterFilterEnum.Size);
}