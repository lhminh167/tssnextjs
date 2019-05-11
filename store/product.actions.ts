import { actionTypes, tickClock } from "../generics/actions";

export const productActionTypes = {
  ...actionTypes
}

export function productTickClock(isServer) {
  return tickClock(isServer);
}
