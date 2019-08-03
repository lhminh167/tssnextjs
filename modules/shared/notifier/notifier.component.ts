import { withSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useTrackedState } from 'reactive-react-redux';
import { IRootState } from './../../root/root.model';
import { notifier } from './notifier.redux';

function Notifier(props) {
    const { enqueueSnackbar } = props;
    const [displayed, storeDisplayed] = useState([]);
    const state = useTrackedState<IRootState>();
    const dispatch = useDispatch();

    useEffect(() => {
        
        state.notifier.notifications.forEach((notification) => {
            // Do nothing if snackbar is already displayed
            if (displayed.includes(notification.key)) return;
            // Display snackbar using notistack
            enqueueSnackbar(notification.message, notification.options);
            // Keep track of snackbars that we've displayed
            storeDisplayed([...displayed, notification.key]);
            // Dispatch action to remove snackbar from redux store
            dispatch(notifier.actions.remove(notification.key));
        });
        return () => { return; };
        
    }, [state.notifier.notifications])

    return null;

}

export default withSnackbar(
    Notifier
);
