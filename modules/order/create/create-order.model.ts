import { Validator } from "fluentvalidation-ts";
import { Shipping } from "../../shared/models/shipping.model";
import { ShippingRegion } from "../../shared/models/shipping-region.model";
import { Tax } from "../../shared/models/tax.model";

export class OrderCreateRequest {
  customerId?: number;
  name?: string;
  // creditCard?: string;
  address1?: string;
  address2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  dayPhone?: string;
  evePhone?: string;
  mobPhone?: string;
  comments?: string;
  paymentMethodId?: string;
  shippingId?: number;
  shippingRegionId?: number;
}

export class OrderCreateRequestValidator extends Validator<OrderCreateRequest> {
  constructor() {
    super();

    this.ruleFor("customerId").greaterThan(0);
    this.ruleFor("name").notEmpty();
    // this.ruleFor('creditCard').notEmpty();
    this.ruleFor("address1").notEmpty();
    this.ruleFor("address2").notEmpty();
    this.ruleFor("city").notEmpty();
    // this.ruleFor("region").notEmpty();
    this.ruleFor("postalCode").notEmpty();
    this.ruleFor("country").notEmpty();
    // this.ruleFor("dayPhone").notEmpty();
    // this.ruleFor("evePhone").notEmpty();
    // this.ruleFor("mobPhone").notEmpty();
    this.ruleFor("comments").notEmpty();
    this.ruleFor("paymentMethodId").notEmpty();
    this.ruleFor('shippingId').greaterThan(0);
    this.ruleFor('shippingRegionId').greaterThan(1);
  }
}

export class OrderCreateForm {
  shippings?: Shipping[];
  shippingRegions?: ShippingRegion[];
  taxes: Tax[]
}

export const defaultOrderCreateForm: OrderCreateForm = {
  shippings: [],
  shippingRegions: [],
  taxes: []
}
