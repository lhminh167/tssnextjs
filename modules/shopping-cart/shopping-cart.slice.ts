import { crudInitialState } from '../shared/crud/crud.state';
import { createSlice } from 'redux-starter-kit';
import { succeeded, failed, idle, pending } from '../shared/crud/crud.reducer';
import { IShopingCartItem, ShoppingCartUrl } from './shopping-cart.model';
import { IState, IAction } from '../shared/crud/crud.model';

const shopingCartInitialData: IShopingCartItem[] = [];

const initialState = crudInitialState(shopingCartInitialData);

const shoppingCart = createSlice({
    slice: ShoppingCartUrl.baseUrl,
    initialState,
    reducers: {
        getCartPending(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem[]>) {
            pending(state);
        },
        getCartSucceeded(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem[]>) {
            state.data = action.payload.content;
            succeeded(state);
        },
        getCartFailed(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem[]>) {
            failed(state, action);
        },
        getCartIdle(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem[]>) {
            idle(state, initialState);
        },



        getWishlistPending(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem[]>) {
            pending(state);
        },
        getWishlistSucceeded(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem[]>) {
            state.data = action.payload.content;
            succeeded(state);
        },
        getWishlistFailed(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem[]>) {
            failed(state, action);
        },
        getWishlistIdle(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem[]>) {
            idle(state, initialState);

        },



        addItemPending(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            pending(state);
        },
        addItemSucceeded(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            state.data.push(action.payload.content);
            succeeded(state);
        },
        addItemFailed(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            failed(state, action);
        },
        addItemIdle(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            idle(state, initialState);
        },



        updateCartPending(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            pending(state);
        },
        updateCartSucceeded(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            const item = action.payload.content;
            let appItem = state.data.find(x => x.itemId === item.itemId);
            appItem = item;
            succeeded(state);
        },
        updateCartFailed(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            failed(state, action);
        },
        updateCartIdle(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            idle(state, initialState);
        },



        removeItemPending(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            pending(state);
        },
        removeItemSucceeded(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            const item = action.payload.content;
            state.data = state.data.filter(x => x.itemId !== item.itemId);
            succeeded(state);
        },
        removeItemFailed(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            failed(state, action);
        },
        removeItemIdle(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            idle(state, initialState);
        },



        saveItemForLaterPending(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            pending(state);
        },
        saveItemForLaterSucceeded(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            const item = action.payload.content;
            state.data = state.data.filter(x => x.itemId !== item.itemId);
            succeeded(state);
        },
        saveItemForLaterFailed(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            failed(state, action);
        },
        saveItemForLaterIdle(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            idle(state, initialState);
        },



        moveItemToCartPending(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            pending(state);
        },
        moveItemToCartSucceeded(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            const item = action.payload.content;
            let appItem = state.data.find(x => x.itemId === item.itemId);
            appItem = item;
            succeeded(state);
        },
        moveItemToCartFailed(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            failed(state, action);
        },
        moveItemToCartIdle(state: IState<IShopingCartItem[]>, action: IAction<IShopingCartItem>) {
            idle(state, initialState);
        },

    }
});

export default shoppingCart;
