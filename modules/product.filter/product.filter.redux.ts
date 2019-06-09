import { Reducer } from '../generics/generics.reducer';
import { productFilterEntityName } from './product.filter.model';
import { Watcher } from "../generics/generics.watcher";

export const productFilterReducer = Reducer(productFilterEntityName);
export const productFilterWatcher = Watcher(productFilterEntityName);