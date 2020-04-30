import { Validator } from 'fluentvalidation-ts';
import { IAttributeValue } from "../shared/models/attribute-value.model";
import { ShippingRegion, defaultShippingRegion } from '../shared/models/shipping-region.model';

const customerBaseUrl = 'Customer';

export const customerUrl = {
    baseUrl: customerBaseUrl,
    register: customerBaseUrl + '/' + 'register',
    login: customerBaseUrl + '/' + 'login',
}

export class Customer {
    customerId?: string;
    name?: string;
    email?: string;
    // password?: string;
    // creditCard?: string;
    address1?: string;
    address2?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
    shippingRegionId?: number;
    shippingRegion?: ShippingRegion;
    dayPhone?: string;
    evePhone?: string;
    mobPhone?: string;
    attributes?: IAttributeValue[];
    role?: string;
}

export const defaultCustomer: Customer = {
    customerId: "0",
    name: "Visitor",
    email: "",
    // password: "",
    // creditCard: "",
    address1: "",
    address2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    shippingRegionId: 2,
    shippingRegion: defaultShippingRegion,
    dayPhone: "",
    evePhone: "",
    mobPhone: "",
    attributes: [],
    role: "Customer"
};


export interface ILoginRequest {
    email?: string;
    password?: string;
}

export interface ICurrentUser {
    customerId?: string;
    role?: string;
    name?: string;
}

export interface ILoginResponse {
    loginToken?: string;
    customer?: Customer;
}


export interface ILoginRequest {
    email?: string;
    password?: string;
}

export class LoginRequestValidator extends Validator<ILoginRequest> {
    constructor() {
        super();

        this.ruleFor('email')
            .notEmpty().emailAddress();

        this.ruleFor('password')
            .notEmpty();
    }
}

export interface ICreateCustomerRequest {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
}

export class CreateCustomerRequestValidator extends Validator<ICreateCustomerRequest> {
    constructor() {
        super();

        this.ruleFor('email')
            .notEmpty().emailAddress();

        this.ruleFor('name')
            .notEmpty();

        this.ruleFor('password')
            .notEmpty();

        this.ruleFor('role')
            .notEmpty();
    }
}

export const defaultCreateCustomerRequest = {
    email: "",
    name: "",
    password: "",
    role: "Customer"
}

export class CustomerUpdateRequestValidator extends Validator<Customer> {
    constructor() {
        super();

        // customerId: "0",
        //     name: "Visitor",
        //         email: "",
        //             // password: "",
        //             // creditCard: "",
        //             address1: "",
        //                 address2: "",
        //                     city: "",
        //                         region: "",
        //                             postalCode: "",
        //                                 country: "",
        //                                     shippingRegionId: 2,
        //                                         shippingRegion: defaultShippingRegion,
        //                                             dayPhone: "",
        //                                                 evePhone: "",
        //                                                     mobPhone: "",
        //                                                         attributes: [],
        //                                                             role: "Customer"

        // this.ruleFor('email')
        //     .notEmpty().emailAddress();

        // this.ruleFor('password')
        //     .notEmpty();
    }
}