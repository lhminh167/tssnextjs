import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import { Color } from '@mui/lab';
import * as Sentry from '@sentry/browser';
import fetchIntercept from 'fetch-intercept';
import React, { Fragment, useState } from 'react';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog.component';
import { IResponse } from '../crud/crud.model';
import { DESCRIPTION, ID, NOTIFIER } from '../tag/tag.model';
import { defaultNotifierState } from './notifier.model';

export default function Notifier() {
  const [state, setState] = useState(defaultNotifierState);

  const handleClose = () => {
    setState({
      ...state,
      isOpen: false
    });
  };

  const unregister = fetchIntercept.register({
    request: (url, config) => [url, config],
    requestError: error => Promise.reject(error),
    response: response => {
      handleResponse(response, response.ok ? 'success' : 'error');
      return response;
    },
    responseError: error => {
      handleResponse(error, 'error');
      return Promise.reject(error);
    }
  });

  const handleResponse = (response: Response, color: Color) => {
    response?.clone().json()
      .then((data: Response) => setState({ ...state, isOpen: true, color, data }))
      .catch(err => ({
        content: null,
        status: response.status,
        title: response.statusText
      } as IResponse<any>));
  };

  const report = () => {
    if (process.env.ENV === 'production')
      Sentry.showReportDialog();
  };

  if (state.color === 'error')
    return (
      <Fragment>
        <ConfirmationDialog
          title={'Error!'}
          open={state.isOpen}
          close={null}
          confirm={handleClose}
          content={
            <Fragment>
              <DialogContentText>
                Description:{' '}
                <Typography
                  component='span'
                  data-cy={DESCRIPTION}
                >
                  {state.data.title}
                </Typography>
              </DialogContentText>
              <DialogContentText
              >
                Error ID:{' '}
                <Typography
                  component='span'
                  data-cy={ID}
                >
                  {state.data.instance}
                </Typography>
              </DialogContentText>
            </Fragment>
          }
          decline={report}
          confirmText='Close'
          declineText='Report'
          data-cy={NOTIFIER}
        />
      </Fragment>
    );

  return null

  // return (
  //   <Snackbar
  //     open={state.isOpen}
  //     autoHideDuration={6000}
  //     onClose={handleClose}
  //   >
  //     <Alert
  //       onClose={handleClose}
  //       severity={state.color}
  //     >
  //       {state.data.title}
  //     </Alert>
  //   </Snackbar>
  // );
}
