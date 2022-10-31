import { Validator } from "fluentvalidation-ts";
import { ShippingRegion } from "../../shared/models/shipping-region.model";
import { Shipping } from "../../shared/models/shipping.model";
import { Tax } from "../../shared/models/tax.model";
import { beRequired } from "../../shared/validator/validator";
import { Order } from "../order.model";

export interface OrderCreateRequest {
  customerId: number;
  name: string;
  // creditCard: string;
  address1: string;
  address2: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  dayPhone: string;
  evePhone: string;
  mobPhone: string;
  comments: string;
  paymentMethodId: string;
  paymentId: string;
  paymentSecret: string;
  shippingId: number;
  shippingRegionId: number;
}

export class OrderCreateRequestValidator extends Validator<OrderCreateRequest> {
  constructor() {
    super();

    this.ruleFor("customerId").greaterThan(0);
    this.ruleFor("name").must(beRequired());
    // this.ruleFor('creditCard').notEmpty();
    this.ruleFor("address1").must(beRequired());
    this.ruleFor("address2").must(beRequired());
    this.ruleFor("city").must(beRequired());
    this.ruleFor("region").must(beRequired());
    this.ruleFor("postalCode").must(beRequired());
    this.ruleFor("country").must(beRequired());
    // this.ruleFor('dayPhone').must(beRequired());
    // this.ruleFor('evePhone').must(beRequired());
    this.ruleFor("mobPhone").must(beRequired());
    // this.ruleFor('comments').must(beRequired());
    // this.ruleFor('paymentMethodId').must(beRequired());
    this.ruleFor("shippingId").greaterThan(0);
    this.ruleFor("shippingRegionId").greaterThan(1);
  }
}

export interface OrderCreateForm {
  shippings: Shipping[];
  shippingRegions: ShippingRegion[];
  taxes: Tax[];
}

export const defaultOrderCreateForm: OrderCreateForm = {
  shippings: [],
  shippingRegions: [],
  taxes: [],
};

export interface OrderCreateResponse {
  order: Order;
  paymentId: string;
  paymentStatus: string;
  paymentSecret: string;
}
