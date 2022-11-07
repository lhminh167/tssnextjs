import Router from "next/router";
import { Role } from "../../customer/customer.model";
import { getCustomerIdNumberFromLoginToken, getCustomerRoleFromLoginToken, goTo, toNumber } from "../helpers/auth.helper";
import { allowHoc } from "./allow.component";

function allowAccountOwner() {
  let allowed =
    toNumber(Router.query.userId as string) ===
      getCustomerIdNumberFromLoginToken() ||
    getCustomerRoleFromLoginToken() === Role.Admin;
  if (!allowed) goTo("/");
  return allowed;
}

export function allowAccountOwnerHoc(WrappedComponent) {
  return allowHoc(WrappedComponent, allowAccountOwner);
}

