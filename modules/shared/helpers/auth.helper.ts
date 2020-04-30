import Router from 'next/router';
import { Customer } from '../../customer/customer.model';
import { Url } from 'url';
import { decodeLoginToken } from './token.helper';

export function redirect(ctx: any, toUrl: string, fromUrl: string = '/') {
    const { req, res } = ctx;
    const isServer = !!req;
    if (isServer) {
        res.writeHead(302, {
            Location: `${toUrl}?next=${req ?.originalUrl ?? fromUrl}`,
        });
        res.end();
    } else {
        Router.push(`${toUrl}?next=${ctx.asPath}`);
    }
}

export function toNumber(customerId: string) {
    const parsed = parseInt(customerId);
    if (isNaN(parsed)) return 0;
    return parsed;
}

export function getCustomerIdNumberFromLoginToken(): number {
    return toNumber(decodeLoginToken() ?.customerId);
}

export function getCustomerIdNumberFromStore(store): number {
    return toNumber(store ?.getState() ?.currentUser ?.data ?.customerId);
}
