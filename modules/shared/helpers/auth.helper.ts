import Router from 'next/router';
import { Customer } from '../../customer/customer.model';
import { Url } from 'url';
import { decodeLoginToken } from './token.helper';

export function redirect(ctx: any, toUrl: string) {
    const { req, res } = ctx;
    const isServer = !!req;
    if (isServer) {
        res.writeHead(302, {
            Location: `${toUrl}?next=${req.originalUrl}`,
        });
        res.end();
    } else {
        Router.push(`${toUrl}?next=${ctx.asPath}`);
    }
}

export function getCustomerId(customerId: string) {
    const parsed = parseInt(customerId);
    if (isNaN(parsed)) return 0;
    return parsed;
}

export function getRole(customer: Customer) {
    return customer?.attributes?.find(a => a.name === 'Role');
}

export function getCustomerIdFromLoginToken(): number {
    return getCustomerId(decodeLoginToken().customerId);
}

export function getCustomerIdFromStore(store): number {
    return store?.getState()?.currentUser?.data?.customerId;
}
