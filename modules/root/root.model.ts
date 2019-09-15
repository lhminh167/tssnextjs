import { IProductFilterState } from './../product-filter/product-filter.model';
import { INotifierState } from './../shared/notifier/notifier.model';
import { IMainLoaderState } from './../shared/loader/loader.model';
import { createStore } from 'redux';
import { Task } from 'redux-saga';
import { IState } from '../shared/crud/crud.model';
import { IShopingCartItem } from '../shopping-cart/shopping-cart.model';

export type TssStore = ReturnType<typeof createStore> & {
    sagaTask: Task;
};

export interface IRootState {
    mainLoader: IMainLoaderState,
    notifier: INotifierState,
    productFilter: IProductFilterState;
    shoppingCart: IState<IShopingCartItem[]>;
}