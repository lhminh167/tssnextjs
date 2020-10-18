import Router from "next/router";
import { Role } from "../../customer/customer.model";
import { getCustomerIdNumberFromLoginToken, getCustomerRoleFromLoginToken, goTo, toNumber } from "../helpers/auth.helper";
import { allowHoc } from "./allow.component";

function allowAccountOwnwer() {
    let allowed = toNumber(Router.query.userId as string) === getCustomerIdNumberFromLoginToken()
        || getCustomerRoleFromLoginToken() === Role.Admin;
    if (!allowed) goTo('/');
    return allowed;
}

export function allowAccountOwnwerHoc(WrappedComponent) {
    return allowHoc(WrappedComponent, allowAccountOwnwer);
}

