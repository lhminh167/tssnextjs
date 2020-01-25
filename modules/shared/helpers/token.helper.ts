import jwtDecode from "jwt-decode";
import { ICurrentUser } from "../../customer/customer.model";
import { currentUserInitialData } from "../../customer/customer.slice";

export function setLoginToken(loginToken: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem("loginToken", loginToken)
}

export function getLoginToken() {
    if (typeof window === 'undefined') return;
    return localStorage.getItem("loginToken");
}

export function setTokenHeader(options: RequestInit) {
    const token = getLoginToken();
    if (token) options.headers["Authorization"] = `Bearer ${token}`;
}

export function removeLoginToken() {
    if (typeof window === 'undefined') return;
    return localStorage.removeItem("loginToken");
}

export function decodeLoginToken(): ICurrentUser {
    try {
        const tokenPayload: ITokenPayload = jwtDecode<ITokenPayload>(localStorage.loginToken);
        return {
            customerId: tokenPayload.nameid,
            name: tokenPayload.unique_name,
            role: tokenPayload.role
        }
    } catch (err) {
        return currentUserInitialData;
    }
}

interface ITokenPayload {
    nameid: string,
    unique_name: string,
    role: string,
}
