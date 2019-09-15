import { logger } from "../logger/logger";

/**
 * Logs all actions and states after they are dispatched.
 */
export const reduxLogger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    logger.info('Some message', {});

    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}
