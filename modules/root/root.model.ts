import { IProductFilterState } from './../product-filter/product-filter.model';
import { INotifierState } from './../shared/notifier/notifier.model';
import { IMainLoaderState } from './../shared/loader/loader.model';
import { createStore } from 'redux';
import { Task } from 'redux-saga';

export type TssStore = ReturnType<typeof createStore> & {
    sagaTask: Task;
};

export interface IRootState {
    mainLoader: IMainLoaderState,
    notifier: INotifierState,
    productFilter: IProductFilterState;
}