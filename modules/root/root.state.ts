import { currentUserInitialState } from "../customer/customer.slice";
import { productFilterInitialState } from "../product/filter/product-filter.slice";
import { shoppingCartItemCountInitialState } from "../shopping-cart/shopping-cart.slice";
import { IRootState } from "./root.model";

export const rootInitialState: IRootState = {
    productFilter: productFilterInitialState,
    currentUser: currentUserInitialState,
    shoppingCartItemCount: shoppingCartItemCountInitialState
}
