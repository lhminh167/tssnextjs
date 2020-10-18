import { Shipping } from './shipping.model';
import { ShippingRegion } from './shipping-region.model';
import { Tax } from './tax.model';
import { IAttributeValue } from './attribute-value.model';
import querystring from 'query-string';

export interface ICatalogGetResponse {
    shipping: Shipping[];
    shippingRegion: ShippingRegion[];
    tax: Tax[];
    role: IAttributeValue[];
}

export const defaultCatalogGetResponse: ICatalogGetResponse = {
    shipping: [],
    shippingRegion: [],
    tax: [],
    role: [],
}

export interface ICatalogGetRequest {
    shipping: boolean;
    shippingRegion: boolean;
    tax: boolean;
    role: boolean;
}

export const defaultCatalogGetRequest: ICatalogGetRequest = {
    shipping: false,
    shippingRegion: false,
    tax: false,
    role: false,
}

const catalogBaseUrl = 'Catalog';

export const catalogUrl = {
    get: (input: ICatalogGetRequest) => catalogBaseUrl + '?' + querystring.stringify(input),
}
