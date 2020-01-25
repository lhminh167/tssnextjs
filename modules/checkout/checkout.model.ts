import { Validator } from "fluentvalidation-ts";

const orderBaseUrl = "Order";

export const orderUrl = {
  baseUrl: orderBaseUrl,
  stockOk: orderBaseUrl + "/stockOk",
  shipOk: orderBaseUrl + "/shipOk"
};

export class DeliveryForm {
  customerId?: number;
  name?: string;
  // creditCard?: string;
  address1?: string;
  address2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  shippingRegionId?: number;
  dayPhone?: string;
  evePhone?: string;
  mobPhone?: string;
  comments?: string;
  shippingId?: number;
  paymentMethodId?: string;
}

export class DeliveryFormValidator extends Validator<DeliveryForm> {
  constructor() {
    super();

    this.ruleFor("customerId").greaterThan(0);
    this.ruleFor("name").notEmpty();
    // this.ruleFor('creditCard').notEmpty();
    this.ruleFor("address1").notEmpty();
    this.ruleFor("address2").notEmpty();
    this.ruleFor("city").notEmpty();
    this.ruleFor("region").notEmpty();
    this.ruleFor("postalCode").notEmpty();
    this.ruleFor("country").notEmpty();
    this.ruleFor("shippingRegionId")
      .greaterThan(0)
      .scalePrecision(null, 4);
    this.ruleFor("dayPhone").notEmpty();
    this.ruleFor("evePhone").notEmpty();
    this.ruleFor("mobPhone").notEmpty();
    this.ruleFor("comments").notEmpty();
    this.ruleFor("shippingId")
      .greaterThan(0)
      .scalePrecision(null, 4);
    this.ruleFor("paymentMethodId").notEmpty();
  }
}
