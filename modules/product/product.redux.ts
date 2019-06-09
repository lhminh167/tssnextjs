import { Reducer } from '../generics/generics.reducer';
import { Watcher } from "../generics/generics.watcher";
import { product } from './product.model';

export const productReducer = Reducer(product.entityName);
export const productWatcher = Watcher(product.entityName)