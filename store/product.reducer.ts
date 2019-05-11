import { productActionTypes } from './product.actions'

export const exampleInitialState = {
  count: 0,
  error: false,
  lastUpdate: 0,
  light: false,
  placeholderData: null
}

function reducer (state = exampleInitialState, action) {
  switch (action.type) {
    case productActionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      }

    case productActionTypes.INCREMENT:
      return {
        ...state,
        ...{ count: state.count + 1 }
      }

    case productActionTypes.DECREMENT:
      return {
        ...state,
        ...{ count: state.count - 1 }
      }

    case productActionTypes.RESET:
      return {
        ...state,
        ...{ count: exampleInitialState.count }
      }

    case productActionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ placeholderData: action.data }
      }

    case productActionTypes.TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.ts, light: !!action.light }
      }

    default:
      return state
  }
}

export default reducer
