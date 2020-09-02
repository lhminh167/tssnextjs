// import Router from 'next/router';
// import { getStore } from '../../root/root.store';
// import { decodeLoginToken } from './token.helper';
// import { customerIdSelector } from '../../customer/customer.slice';
// import { IRootState } from '../../root/root.model';

import { customerIdSelector } from "../../../../modules/customer/customer.slice";
import { getStore } from "../../../../modules/root/root.store";
import { IRootState } from "../../../../modules/root/root.model";

// export function toNumber(string: string) {
//     const parsed = parseInt(string);
//     return isNaN(parsed) ? 0 : parsed;
// }

export function getCustomerIdStringFromStoreTest(): string {
    return customerIdSelector(getStore().getState() as IRootState);
}

// export function getCustomerIdNumberFromLoginToken(): number {
//     return toNumber(decodeLoginToken()?.customerId);
// }

// export function getCustomerIdNumberFromStore(): number {
//     return toNumber(getCustomerIdStringFromStore());
// }

// export function goTo(url: string) {
//     Router.push(url ?? '/');
// }

// export function backToPreviousPage() {
//     goTo(Router.query.next as string);
// }

// export function allowCustomer() {
//     const customerId = getCustomerIdNumberFromStore();
//     if (customerId <= 0) goTo('/user/login');
// }

// export function allowAnonymous() {
//     const customerId = getCustomerIdStringFromStore();
//     if (!customerId) goTo('/user/login');
// }