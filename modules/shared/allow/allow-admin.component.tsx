import { goBack, isAdmin } from "../helpers/auth.helper";
import { allowHoc } from "./allow.component";

function allowAdmin(): boolean {
    const allowed = isAdmin();
    if (!allowed) goBack();
    return allowed;
}

export function allowAdminHoc(WrappedComponent) {
    return allowHoc(WrappedComponent, allowAdmin);
}
