import { Response } from "../crud/crud.model";
import { Color } from "@material-ui/lab";

export interface INotifierState {
  isOpen: boolean;
  data: Response<any>;
  color: Color;
}

export const defaultNotifierState: INotifierState = {
  isOpen: false,
  data: new Response(),
  color: 'success'
};
