import Router from "next/router";
import { customerUrl } from "../../customer/customer.model";
import { getState } from "../../root/root.store";
import { shoppingCartItemCountSelector } from "../../shopping-cart/shopping-cart.slice";
import { goTo, isCustomer } from "../helpers/auth.helper";
import { allowHoc } from "./allow.component";

function allowCheckout(): boolean {
  let allowed = isCustomer();

  if (!allowed) goTo(customerUrl.login(), Router.pathname, "");

  const count = shoppingCartItemCountSelector(getState());
  allowed = count > 0;
  if (!allowed) goTo("/shopping-cart", "", "");

  return allowed;
}

export function allowCheckoutHoc(WrappedComponent) {
  return allowHoc(WrappedComponent, allowCheckout);
}
