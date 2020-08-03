import { Validator } from "fluentvalidation-ts";
import { Shipping } from "../../shared/models/shipping.model";
import { ShippingRegion } from "../../shared/models/shipping-region.model";
import { Tax } from "../../shared/models/tax.model";

export interface OrderCreateRequest {
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
    this.ruleFor("name").notNull().notEmpty();
    // this.ruleFor('creditCard').notEmpty();
    this.ruleFor("address1").notNull().notEmpty();
    this.ruleFor("address2").notNull().notEmpty();
    this.ruleFor("city").notNull().notEmpty();
    this.ruleFor("region").notNull().notEmpty();
    this.ruleFor("postalCode").notNull().notEmpty();
    this.ruleFor("country").notNull().notEmpty();
    // this.ruleFor("dayPhone").notNull().notEmpty();
    // this.ruleFor("evePhone").notNull().notEmpty();
    this.ruleFor("mobPhone").notNull().notEmpty();
    // this.ruleFor("comments").notNull().notEmpty();
    // this.ruleFor("paymentMethodId").notNull().notEmpty();
    this.ruleFor('shippingId').greaterThan(0);
    this.ruleFor('shippingRegionId').greaterThan(1);
  }
}

export interface OrderCreateForm {
  shippings?: Shipping[];
  shippingRegions?: ShippingRegion[];
  taxes: Tax[]
}

export const defaultOrderCreateForm: OrderCreateForm = {
  shippings: [],
  shippingRegions: [],
  taxes: []
}
