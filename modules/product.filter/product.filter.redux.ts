import { Reducer, newSlice } from '../generics/generics.reducer';
import { productFilterEntityName } from './product.filter.model';
import { Watcher } from "../generics/generics.watcher";

export const productFilter = newSlice(productFilterEntityName);
export const productFilterWatcher = Watcher(productFilter);
