/**
 * Schedules actions with { meta: { raf: true } } to be dispatched inside a rAF loop
 * frame.  Makes `dispatch` return a function to remove the action from the queue in
 * this case.
 */
export const rafScheduler = store => next => {
    let queuedActions = []
    let frame = null

    function loop() {
        frame = null
        try {
            if (queuedActions.length) {
                next(queuedActions.shift())
            }
        } finally {
            maybeRaf()
        }
    }

    function maybeRaf() {
        if (queuedActions.length && !frame) {
            frame = requestAnimationFrame(loop)
        }
    }

    return action => {
        if (!action.meta || !action.meta.raf) {
            return next(action)
        }

        queuedActions.push(action)
        maybeRaf()

        return function cancel() {
            queuedActions = queuedActions.filter(a => a !== action)
        }
    }
}
