import Router from "next/router";
import { getCustomerIdNumberFromLoginToken, goTo, toNumber } from "../helpers/auth.helper";
import { allowHoc } from "./allow.component";

function allowAccountOwnwer() {
    const allowed = toNumber(Router.query.userId as string) === getCustomerIdNumberFromLoginToken();
    if (!allowed) goTo('/');
    return allowed;
}

export function allowAccountOwnwerHoc(WrappedComponent) {
    return allowHoc(WrappedComponent, allowAccountOwnwer);
}

