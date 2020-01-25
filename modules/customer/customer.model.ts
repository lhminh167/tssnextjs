import { Validator } from 'fluentvalidation-ts';
import { IAttributeValue } from "../shared/models/attribute-value.model";

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
    dayPhone?: string;
    evePhone?: string;
    mobPhone?: string;
    attributes?: IAttributeValue[];
    role?: string;
}

export interface ILoginResquest {
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


export interface ILoginResquest {
    email?: string;
    password?: string;
}

export class LoginRequestValidator extends Validator<ILoginResquest> {
    constructor() {
        super();

        this.ruleFor('email')
            .notEmpty().emailAddress();

        this.ruleFor('password')
            .notEmpty();
    }
}
