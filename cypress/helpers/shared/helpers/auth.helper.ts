import { Customer, defaultCustomer, ICreateCustomerRequest, ILoginRequest, Role } from "../../../../modules/customer/customer.model";
import { getLoginToken, setLoginToken } from "../../../../modules/shared/helpers/token.helper";
import { cyCustomer } from "../../customer/customer.model";
import { getRandomNumbers, getRandomString } from "./string.helper";

export function mockRootAdminAccount() {
    const res: ILoginRequest = {
        email: 'lhminh.phs@gmail.com',
        password: 'string'
    };
    return res;
}

export function mockRandomAccount() {
    const randomText = getRandomString(5);
    const res: ICreateCustomerRequest = {
        ...defaultCustomer,
        name: randomText,
        email: randomText + '@mail.com',
        password: randomText
    };
    return res;
}

export function mockRandomCustomer() {
    const randomText = getRandomString(5);
    const randomNums = getRandomNumbers(10);
    const newPassword = getRandomString(5);
    const res: cyCustomer = {
        ...defaultCustomer,
        name: randomText,
        email: randomText + '@mail.com',
        mobPhone: randomNums,
        dayPhone: randomNums,
        evePhone: randomNums,
        postalCode: randomText,
        city: randomText,
        region: randomText,
        role: Role.Customer,
        address1: randomText,
        address2: randomText,
        country: randomText,
        shippingRegionId: 2,
        password: randomText,
        newPassword,
        confirmNewPassword: newPassword
    }
    return res;
}

export function cySetAdminLoginToken() {
    const token = cyGetAdminLoginToken();
    setLoginToken(token);
    return cy;
}

export function cySetCustomerLoginToken() {
    const token = cyGetCustomerLoginToken();
    setLoginToken(token);
    return cy;
}


export function cyGetExistingCustomer(): cyCustomer {
    const customer = JSON.parse(Cypress.env('CYPRESS_CUSTOMER'));
    return customer;
}

export function cyGetAdminLoginToken() {
    const token = Cypress.env('CYPRESS_ADMIN_LOGIN_TOKEN');
    return token;
}

export function cyGetCustomerLoginToken() {
    const token = Cypress.env('CYPRESS_CUSTOMER_LOGIN_TOKEN');
    return token;
}