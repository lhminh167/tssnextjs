import { goTo, isAnonymous } from "../helpers/auth.helper";
import { allowHoc } from "./allow.component";

function allowAnonymous() {
    const allowed = isAnonymous();
    if (!allowed) goTo('/');
    return allowed;
}

export function allowAnonymousHoc(WrappedComponent) {
    return allowHoc(WrappedComponent, allowAnonymous);
}

