import { Validator } from 'fluentvalidation-ts';
import { defaultShippingRegion, ShippingRegion } from './shipping-region.model';

export class Shipping {
    shippingId: number;
    shippingType: string;
    shippingCost: number;
    shippingRegionId: number;
    shippingRegion: ShippingRegion;
}

export class ShippingValidator extends Validator<Shipping> {
    constructor() {
        super();

        this.ruleFor('shippingId')
            .greaterThan(0);
        this.ruleFor('shippingType')
            .notEmpty();
        this.ruleFor('shippingCost')
            .greaterThan(0);
        this.ruleFor('shippingRegionId')
            .greaterThan(0);
    }
}

export const defaultShipping = {
    shippingId: 1,
    shippingType: '',
    shippingCost: 0,
    shippingRegionId: 0,
    shippingRegion: defaultShippingRegion
}
