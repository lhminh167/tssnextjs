import { goTo, isCustomer } from "../helpers/auth.helper";
import { allowHoc } from "./allow.component";

function allowNotLoggedIn() {
  const isLoggedIn = isCustomer();
  if (isLoggedIn) goTo("/", "", "");
  return !isLoggedIn;
}

export function allowNotLoggedInHoc(WrappedComponent) {
  return allowHoc(WrappedComponent, allowNotLoggedIn);
}
