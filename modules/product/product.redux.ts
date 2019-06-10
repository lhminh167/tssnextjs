import { newSlice } from '../generics/generics.reducer';
import { Watcher } from "../generics/generics.watcher";
import { productEntityName } from './product.model';

export const product = newSlice(productEntityName);
export const productWatcher = Watcher(product)
