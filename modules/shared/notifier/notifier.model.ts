import { Color } from '@mui/lab';
import { IResponse } from '../crud/crud.model';

export interface INotifierState {
  isOpen: boolean;
  data: IResponse<any>;
  color: Color;
}

export const defaultNotifierState: INotifierState = {
  isOpen: false,
  data: {},
  color: 'success'
};
