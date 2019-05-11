import { actionTypes } from "../generics/actions";

export const productActionTypes = {
  ...actionTypes
}

export function failure (error) {
  return {
    type: productActionTypes.FAILURE,
    error
  }
}

export function increment () {
  return { type: productActionTypes.INCREMENT }
}

export function decrement () {
  return { type: productActionTypes.DECREMENT }
}

export function reset () {
  return { type: productActionTypes.RESET }
}

export function loadData () {
  return { type: productActionTypes.LOAD_DATA }
}

export function loadDataSuccess (data) {
  return {
    type: productActionTypes.LOAD_DATA_SUCCESS,
    data
  }
}

export function startClock () {
  return { type: productActionTypes.START_CLOCK }
}

export function tickClock (isServer) {
  return {
    type: productActionTypes.TICK_CLOCK,
    light: !isServer,
    ts: Date.now()
  }
}
