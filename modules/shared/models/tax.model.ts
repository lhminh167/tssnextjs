import { Shipping } from "./shipping.model";

export interface Tax {
    taxId: number;
    taxType: string;
    taxPercentage: number;
}

export function getTaxId(shipping: Shipping) {
    return shipping.shippingRegionId == 2 ? 2 : 1;
}

export const defaultTax: Tax = {
    taxId: 0,
    taxType: '',
    taxPercentage: 0
}