import { IAttributeValue } from "../models/attribute-value.model";

export function encodeAttributes(attributeList: IAttributeValue[]): string {
    const attributes: string = attributeList.map(a => a.name).join('/');
    const attributeValues: string = attributeList.map(a => a.value).join('/');
    return attributes+':'+attributeValues;
}