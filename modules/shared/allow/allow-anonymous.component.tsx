import { isAnonymous, goBack } from "../helpers/auth.helper";
import { allowHoc } from "./allow.component";

function allowAnonymous() {
    const allowed = isAnonymous();
    if (!allowed) goBack();
    return allowed;
}

export function allowAnonymousHoc(WrappedComponent) {
    return allowHoc(WrappedComponent, allowAnonymous);
}

