import jwtDecode from "jwt-decode";
import { Customer, defaultCustomer } from "../../customer/customer.model";

export function setLoginToken(loginToken: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem("loginToken", loginToken)
}

export function getLoginToken(): string {
    if (typeof window === 'undefined') return;
    return localStorage.getItem("loginToken") ?? null;
}

export function getValidLoginToken(): string {
    return getLoginToken();
}

export function setTokenHeader(options: RequestInit) {
    const token = getValidLoginToken();
    if (token) options.headers["Authorization"] = `Bearer ${token}`;
}

export function removeLoginToken() {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem("loginToken");
}

export function decodeLoginToken(): Customer {
    try {
        const tokenPayload: ITokenPayload = jwtDecode<ITokenPayload>(getLoginToken());
        if (new Date(tokenPayload.exp) < new Date())
            return {
                customerId: tokenPayload.nameid,
                name: tokenPayload.unique_name,
                role: tokenPayload.role
            };

        return defaultCustomer;
    } catch (err) {
        return defaultCustomer;
    }
}

interface ITokenPayload {
    nameid: string,
    unique_name: string,
    role: string,
    nbf: Date,
    exp: Date,
    iat: Date
}
