import { configureStore } from '@reduxjs/toolkit';
import { Task } from 'redux-saga';
import { rootReducer } from './root.reducer';

export type TssStore = ReturnType<typeof configureStore> & {
    sagaTask?: Task
}

export type IRootState = ReturnType<typeof rootReducer>
