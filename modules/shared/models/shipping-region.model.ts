import { Validator } from "fluentvalidation-ts";

export interface ShippingRegion {
    shippingRegionId: number;
    shippingRegion1: string;
}

export class ShippingRegionValidator extends Validator<ShippingRegion> {
    constructor() {
        super();

        this.ruleFor('shippingRegionId')
            .greaterThan(0);
        this.ruleFor('shippingRegion1')
            .notEmpty();
    }
}

export const defaultShippingRegion = {
    shippingRegionId: 1,
    shippingRegion1: ''
}
