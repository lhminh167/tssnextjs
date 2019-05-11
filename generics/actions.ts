export const actionTypes = {
  FAILURE: 'FAILURE',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  START_CLOCK: 'START_CLOCK',
  TICK_CLOCK: 'TICK_CLOCK'
}

export function actions () {

  function failure (error) {
    return {
      type: actionTypes.FAILURE,
      error
    }
  }
  
  function increment () {
    return { type: actionTypes.INCREMENT }
  }
  
  function decrement () {
    return { type: actionTypes.DECREMENT }
  }
  
  function reset () {
    return { type: actionTypes.RESET }
  }
  
  function loadData () {
    return { type: actionTypes.LOAD_DATA }
  }
  
  function loadDataSuccess (data) {
    return {
      type: actionTypes.LOAD_DATA_SUCCESS,
      data
    }
  }
  
  function startClock () {
    return { type: actionTypes.START_CLOCK }
  }
  
  function tickClock (isServer) {
    return {
      type: actionTypes.TICK_CLOCK,
      light: !isServer,
      ts: Date.now()
    }
  }

  return {
    failure,
    increment,
    decrement,
    reset,
    loadData,
    loadDataSuccess,
    startClock,
    tickClock
  }
}

