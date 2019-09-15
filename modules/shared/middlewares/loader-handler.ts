import { IAction } from "../crud/crud.model";
import { mainLoader } from "../loader/loader.redux";
import { Store } from "redux";
import { IRootState } from "../../root/root.model";

export const loaderHandler = (store: Store<IRootState>) => next => (action: IAction<any>) => {
        if
        (
            action.type.endsWith("Succeeded") ||
            action.type.endsWith("Failed")
        )
        {
            store.dispatch(mainLoader.actions.hide());
        };
        return next(action);

}
