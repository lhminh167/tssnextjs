import { IProductFilterState } from './../product-filter/product-filter.model';
import { INotifierState } from './../shared/notifier/notifier.model';
import { IMainLoaderState } from './../shared/loader/loader.model';
import { createStore } from 'redux';
import { Task } from 'redux-saga';
import { IState } from '../shared/crud/crud.model';
import { IShopingCartItem } from '../shopping-cart/shopping-cart.model';
import { ICurrentUser } from '../customer/customer.model';
import { rootReducer } from './root.reducer';

export type TssStore = ReturnType<typeof createStore> & {
    sagaTask: Task;
};

export type IRootState = ReturnType<typeof rootReducer>
