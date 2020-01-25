import { PayloadAction, IState } from './crud.model';

export function pending(state: IState<any>) {
    state.isLoading = true;
    state.error = null;
}

export function succeeded(state: IState<any>) {
    state.isLoading = false;
    state.error = null;
}

export function failed(state: IState<any>, action: any) {
    state.isLoading = false;
    state.error = action;
}

export function idle(state: IState<any>, initialState: IState<any>) {
    state = initialState;
}