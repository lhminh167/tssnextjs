import jwtDecode from "jwt-decode";
import { ICurrentUser, defaultCustomer } from "../../customer/customer.model";
import { getCustomerIdNumberFromLoginToken } from "./auth.helper";

export function setLoginToken(loginToken: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem("loginToken", loginToken)
}

export function getLoginToken() {
    if (typeof window === 'undefined') return;
    return localStorage.getItem("loginToken");
}

export function getValidLoginToken() {
    return getCustomerIdNumberFromLoginToken() > 0
        ? getLoginToken()
        : null;
}

export function setTokenHeader(options: RequestInit) {
    const token = getValidLoginToken();
    if (token) options.headers["Authorization"] = `Bearer ${token}`;
}

export function removeLoginToken() {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem("loginToken");
}

export function decodeLoginToken(): ICurrentUser {
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
