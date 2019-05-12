import { actionTypes } from './actions';
import { baseIntitialState } from './state';

export function Reducer(entityName: string, intitialState = baseIntitialState) {

  return function (state = intitialState, action) {

    switch (action.type) {

      case actionTypes(entityName).GET_PENDING:
        return {
          ...state,
          ...intitialState,
          loading: true
        }

      case actionTypes(entityName).GET_FAILED:
        return {
          ...state,
          ...intitialState,
          error: action.payload,

        }

      case actionTypes(entityName).GET_SUCCEEDED:
        return {
          ...state,
          ...intitialState,
          data: action.payload
        }

      case actionTypes(entityName).GET_IDLE:
        return {
          ...state,
          ...intitialState
        }

      default:
        return state
    }

  }

}
