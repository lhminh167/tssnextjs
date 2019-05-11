import { actionTypes } from './actions'

export const exampleInitialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

function reducer (state = exampleInitialState, action) {
  switch (action.type) {

    // case actionTypes.RESET:
    //   return {
    //     ...state,
    //     ...{ count: exampleInitialState.count }
    //   }

    case actionTypes('product').GET_SUCCEEDED:
      return {
        ...state,
        ...{ placeholderData: action.payload }
      }

    // case actionTypes.TICK_CLOCK:
    //   return {
    //     ...state,
    //     ...{ lastUpdate: action.ts, light: !!action.light }
    //   }

    default:
      return state
  }
}

export default reducer
