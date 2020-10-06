import { Color } from '@material-ui/lab';
import { IResponse, Response } from '../crud/crud.model';

export interface INotifierState {
  isOpen: boolean;
  data: IResponse<any>;
  color: Color;
}

export const defaultNotifierState: INotifierState = {
  isOpen: false,
  data: new Response(),
  color: 'success'
};
