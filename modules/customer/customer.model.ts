import { Validator } from 'fluentvalidation-ts';
import { defaultShippingRegion, ShippingRegion } from '../shared/models/shipping-region.model';

const customerBaseUrl = 'Customer';

export const customerUrl = {
    baseUrl: customerBaseUrl,
    register: customerBaseUrl + '/' + 'register',
    login: customerBaseUrl + '/' + 'login',
    updatePassword: (customerId: number) => `${customerBaseUrl}/${customerId}/Password`,
}

export interface Customer {
    customerId?: string;
    name?: string;
    email?: string;
    // creditCard?: string;
    address1?: string;
    address2?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
    shippingRegion?: ShippingRegion;
    dayPhone?: string;
    evePhone?: string;
    mobPhone?: string;
    role?: string;
}

export const defaultCustomer: Customer = {
    customerId: "0",
    name: "Visitor",
    email: "",
    // creditCard: "",
    address1: "",
    address2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    shippingRegion: defaultShippingRegion,
    dayPhone: "",
    evePhone: "",
    mobPhone: "",
    role: '',
};

export interface ILoginRequest {
    email?: string;
    password?: string;
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
            .notNull().notEmpty().emailAddress();

        this.ruleFor('password')
            .notNull().notEmpty();
    }
}

export interface ICreateCustomerRequest {
    name?: string;
    email?: string;
    password?: string;
    // role?: string;
}

export class CreateCustomerRequestValidator extends Validator<ICreateCustomerRequest> {
    constructor() {
        super();

        this.ruleFor('email')
            .notNull().notEmpty().emailAddress();

        this.ruleFor('name')
            .notNull().notEmpty();

        this.ruleFor('password')
            .notNull().notEmpty();
    }
}

export const defaultCreateCustomerRequest = {
    email: "",
    name: "",
    password: "",
    role: "Customer"
}

export interface CustomerUpdateRequest {
    customerId?: number;
    name?: string;
    email?: string;
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
    role?: string;
}

export const defaultCustomerUpdateRequest: CustomerUpdateRequest = {
    customerId: 0,
    name: "Visitor",
    email: "",
    // creditCard: "",
    address1: "",
    address2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    shippingRegionId: 0,
    dayPhone: "",
    evePhone: "",
    mobPhone: "",
    role: "Customer"
}

export class CustomerUpdateRequestValidator extends Validator<CustomerUpdateRequest> {
    constructor() {
        super();

        this.ruleFor('customerId').greaterThan(0);
        this.ruleFor('name').notNull().notEmpty();
        this.ruleFor('email').notNull().notEmpty().emailAddress();
        this.ruleFor('address1').notNull().notEmpty();
        this.ruleFor('address2').notNull().notEmpty();
        this.ruleFor('city').notNull().notEmpty();
        this.ruleFor('region').notNull().notEmpty();
        this.ruleFor('postalCode').notNull().notEmpty();
        // .must(value => postalCodeRegex.test(value));
        this.ruleFor('country').notNull().notEmpty();
        this.ruleFor('shippingRegionId').greaterThan(1);
        this.ruleFor('dayPhone').notNull().notEmpty();
        // .must(value => phoneNumberRegex.test(value));
        this.ruleFor('evePhone').notNull().notEmpty();
        // .must(value => phoneNumberRegex.test(value));
        this.ruleFor('mobPhone').notNull().notEmpty();
        // .must(value => phoneNumberRegex.test(value));
        this.ruleFor('role').notNull().notEmpty();
    }
}

export interface CustomerUpdatePasswordState {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export const defaultCustomerUpdatePasswordState: CustomerUpdatePasswordState = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
}

export class CustomerUpdatePasswordStateValidator extends Validator<CustomerUpdatePasswordState> {
    constructor() {
        super();

        this.ruleFor('currentPassword').notNull().notEmpty();
        this.ruleFor('newPassword').notNull().notEmpty();
        this.ruleFor('confirmNewPassword').notNull().notEmpty().must((value, model) => value === model.newPassword)
            .withMessage('New Password and Confirm New Password fields do not match.');
    }
}

export interface CustomerUpdatePasswordRequest {
    customerId: number;
    currentPassword: string;
    newPassword: string;
}
