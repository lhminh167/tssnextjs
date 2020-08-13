import Router from 'next/router';
import { decodeLoginToken } from './token.helper';

export function redirect(ctx: any, toUrl: string, fromUrl: string = '/') {
    const { req, res } = ctx;
    const isServer = !!req;
    if (isServer) {
        res.writeHead(302, {
            Location: `${toUrl}?next=${req?.originalUrl ?? fromUrl}`,
        });
        res.end();
    } else {
        Router.push(`${toUrl}?next=${ctx.asPath}`);
    }
}

export function toNumber(string: string) {
    const parsed = parseInt(string);
    return isNaN(parsed) ? 0 : parsed;
}

export function getCustomerIdNumberFromLoginToken(): number {
    return toNumber(decodeLoginToken()?.customerId);
}

export function getCustomerIdNumberFromStore(store): number {
    return toNumber(store?.getState()?.currentUser?.data?.customerId);
}

export function goTo(url: string) {
    Router.push(url);
}

