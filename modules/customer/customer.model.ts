import { Validator } from 'fluentvalidation-ts';
import { defaultShippingRegion, ShippingRegion } from '../shared/models/shipping-region.model';
import { beRequired } from '../shared/validator/validator';

export const apiCustomerBaseUrl = 'Customer';

export const apiCustomerUrl = {
    baseUrl: apiCustomerBaseUrl,
    register: apiCustomerBaseUrl,
    login: apiCustomerBaseUrl + '/' + 'login',
    detail: (customerId: number) => `${apiCustomerBaseUrl}/${customerId}`,
    updatePassword: (customerId: number) => `${apiCustomerBaseUrl}/${customerId}/Password`,
    forgotPassword: `${apiCustomerBaseUrl}/ForgotPassword`,
    resetPassword: (customerId: number, resetPasswordToken: string) => `${apiCustomerBaseUrl}/${customerId}/ResetPassword/${resetPasswordToken}`,
}

const customerBaseUrl = '/user';

export const customerUrl = {
    baseUrl: customerBaseUrl,
    register: (returnUrl?: string) => `${customerBaseUrl}/register${returnUrl ? '?next=' + returnUrl : ''}`,
    login: (returnUrl?: string) => `${customerBaseUrl}/login${returnUrl ? '?next=' + returnUrl : ''}`,
    list: `${customerBaseUrl}/list`,
    detail: (customerId: number) => ({
        href: `${customerBaseUrl}/[customerId]`,
        as: `${customerBaseUrl}/${customerId}`
    }),
    edit: (customerId: number) => ({
        href: `${customerBaseUrl}/[customerId]/edit`,
        as: `${customerBaseUrl}/${customerId}/edit`
    }),
    updatePassword: (customerId: number) => `${customerBaseUrl}/${customerId}/change-password`,
    forgotPassword: `${customerBaseUrl}/forgot-password`,
    resetPassword: (customerId: number, resetPasswordToken: string) => `${customerBaseUrl}/${customerId}/reset-password/${resetPasswordToken}`,
}

export const loginTokenKey = 'loginToken';

export interface Customer {
    customerId?: string;
    name?: string;
    email?: string;
    creditCard?: string;
    address1?: string;
    address2?: string;
    city?: string;
    region?: string;
    postalCode?: string;
    country?: string;
    shippingRegion?: ShippingRegion;
    shippingRegionId: number;
    dayPhone?: string;
    evePhone?: string;
    mobPhone?: string;
    role?: Role;
}

export enum Role {
    Admin = 'Admin',
    Customer = 'Customer'
}

export const defaultCustomer: Customer = {
    customerId: null,
    name: 'Visitor',
    email: '',
    creditCard: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    shippingRegion: defaultShippingRegion,
    shippingRegionId: 1,
    dayPhone: '',
    evePhone: '',
    mobPhone: '',
    role: Role.Customer,
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
            .must(beRequired()).emailAddress();

        this.ruleFor('password')
            .must(beRequired());
    }
}

export interface ICreateCustomerRequest {
    name?: string;
    email?: string;
    password?: string;
    confirmNewPassword?: string;
}

export class CreateCustomerRequestValidator extends Validator<ICreateCustomerRequest> {
    constructor() {
        super();

        this.ruleFor('email')
            .must(beRequired()).emailAddress();

        this.ruleFor('name')
            .must(beRequired());

        this.ruleFor('password')
            .must(beRequired());

        this.ruleFor('confirmNewPassword')
            .must(beRequired()).must(beRequired())
            .must((value, model) => value === model.password).withMessage('New Password and Confirm New Password fields do not match');
    }
}

export const defaultCreateCustomerRequest = {
    email: '',
    name: '',
    password: '',
    role: Role.Customer
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
    name: 'Visitor',
    email: '',
    // creditCard: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    shippingRegionId: 0,
    dayPhone: '',
    evePhone: '',
    mobPhone: '',
    role: Role.Customer
}

export class CustomerUpdateRequestValidator extends Validator<CustomerUpdateRequest> {
    constructor() {
        super();

        this.ruleFor('customerId').greaterThan(0);
        this.ruleFor('name').must(beRequired());
        this.ruleFor('email').must(beRequired()).emailAddress();
        this.ruleFor('address1').must(beRequired());
        this.ruleFor('address2').must(beRequired());
        this.ruleFor('city').must(beRequired());
        this.ruleFor('region').must(beRequired());
        this.ruleFor('postalCode').must(beRequired());
        // .must(value => postalCodeRegex.test(value));
        this.ruleFor('country').must(beRequired());
        this.ruleFor('shippingRegionId').greaterThan(1);
        this.ruleFor('dayPhone').must(beRequired());
        // .must(value => phoneNumberRegex.test(value));
        this.ruleFor('evePhone').must(beRequired());
        // .must(value => phoneNumberRegex.test(value));
        this.ruleFor('mobPhone').must(beRequired());
        // .must(value => phoneNumberRegex.test(value));
        this.ruleFor('role').must(beRequired());
    }
}

export interface CustomerUpdatePasswordState {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}

export const defaultCustomerUpdatePasswordState: CustomerUpdatePasswordState = {
    password: '',
    newPassword: '',
    confirmNewPassword: '',
}

export class CustomerUpdatePasswordStateValidator extends Validator<CustomerUpdatePasswordState> {
    constructor() {
        super();

        this.ruleFor('password').must(beRequired());
        this.ruleFor('newPassword').must(beRequired());
        this.ruleFor('confirmNewPassword').must(beRequired()).must((value, model) => value === model.newPassword)
            .withMessage('New Password and Confirm New Password fields do not match');
    }
}

export interface CustomerUpdatePasswordRequest {
    customerId: number;
    password: string;
    newPassword: string;
}

export interface CustomerForgotPasswordRequest {
    email: string;
}

export const defaultCustomerForgotPasswordRequest: CustomerForgotPasswordRequest = {
    email: ''
};

export class CustomerForgotPasswordRequestValidator extends Validator<CustomerForgotPasswordRequest> {
    constructor() {
        super();
        this.ruleFor('email').must(beRequired()).emailAddress();
    }
}

export interface CustomerPasswordResetTokenValidationRequest {
    customerId: number;
    resetPasswordToken: string;
}

export interface CustomerPasswordResetRequest {
    customerId: number;
    resetPasswordToken: string;
    newPassword: string;
}

export interface CustomerPasswordResetState {
    newPassword: string;
    confirmNewPassword: string;
}

export const defaultCustomerPasswordResetState: CustomerPasswordResetState = {
    newPassword: '',
    confirmNewPassword: ''
};

export class CustomerPasswordResetStateValidator extends Validator<CustomerPasswordResetState> {
    constructor() {
        super();
        this.ruleFor('newPassword').must(beRequired());
        this.ruleFor('confirmNewPassword').must(beRequired())
            .must((value, model) => value === model.newPassword)
            .withMessage('New Password and Confirm New Password fields do not match');
    }
}
