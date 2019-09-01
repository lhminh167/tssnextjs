export function loaderHandler({ dispatch }) {
   return next => (action: Promise<any>) => {
      if (action instanceof Promise) {
         dispatch({ type: 'SHOW_LOADER' });
         action
            .then(() => dispatch({ type: 'HIDE_LOADER' }))
            .catch(() => dispatch({ type: 'HIDE_LOADER' }));
      }
      return next(action);
   };
}
