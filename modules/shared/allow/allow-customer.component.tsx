import { isCustomer, goTo } from "../helpers/auth.helper";
import { customerUrl } from "../../customer/customer.model";
import { allowHoc } from "./allow.component";
import Router from "next/router";

function allowCustomer() {
    const allowed = isCustomer();
    if (!allowed) goTo(customerUrl.login(), Router.pathname, customerUrl.login(Router.pathname));
    return allowed;
}

export function allowCustomerHoc(WrappedComponent) {
    return allowHoc(WrappedComponent, allowCustomer);
}

