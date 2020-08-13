import { createStore } from 'redux';
import { Task } from 'redux-saga';
import { rootReducer } from './root.reducer';

export type TssStore = ReturnType<typeof createStore> & {
    sagaTask: Task;
};

export type IRootState = ReturnType<typeof rootReducer>
