import Router from 'next/router';
import { Role } from '../../customer/customer.model';
import { customerIdSelector, customerRoleSelector } from '../../customer/customer.slice';
import { getState } from '../../root/root.store';
import { decodeLoginToken, getLoginToken } from './token.helper';

export function toNumber(input: string) {
    const hasLetters: boolean = (/[A-Z]+/ig).test(input);
    if (hasLetters) return 0;

    const parsed = parseInt(input);
    return isNaN(parsed) ? 0 : parsed;
}

export function getCustomerIdStringFromStore(): string {
    return customerIdSelector(getState());
}

export function getCustomerIdNumberFromLoginToken(): number {
    const customerId = decodeLoginToken()?.customerId;

    return toNumber(customerId);
}

export function getCustomerRoleFromLoginToken(): Role {
    return decodeLoginToken()?.role;
}

export function getCustomerIdNumberFromStore(): number {
    return toNumber(getCustomerIdStringFromStore());
}

export function getCustomerRoleFromStore(): string {
    return customerRoleSelector(getState());
}

export function goTo(url: string, returnUrl?: string, asPath?: string) {
    const destination = (url ?? '/') + (returnUrl ? '?next=' + returnUrl : '');
    Router.push(destination, asPath);
}

export function backToPreviousPage() {
    goTo(Router.query.next as string);
}

export function goBack() {
    Router.back();
}

export function isAnonymous(): boolean {
    const token = getLoginToken();
    const allowed = token?.length > 0;
    return allowed;
}

export function isCustomer(): boolean {
    const customerId = getCustomerIdNumberFromLoginToken();

    return customerId > 0;
}

export function isAdmin(): boolean {
    const role = getCustomerRoleFromLoginToken();
    const allowed = role === Role.Admin;
    return allowed
}
