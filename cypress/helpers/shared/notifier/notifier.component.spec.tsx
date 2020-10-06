import { Snackbar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Alert } from '@material-ui/lab';
import fetchIntercept from 'fetch-intercept';
import React, { Fragment, useState } from 'react';
import { defaultNotifierState } from './notifier.model';
import { Response as AppResponse } from '../crud/crud.model';
import * as Sentry from '@sentry/browser';

export default function Notifier() {
  const [state, setState] = useState(defaultNotifierState);

  const handleClose = () => {
    setState({
      ...state,
      isOpen: false
    });
  };

  const unregister = fetchIntercept.register({
    request: function (url, config) {
      return [url, config];
    },

    requestError: function (error) {

      return Promise.reject(error);
    },

    response: function (response) {
      const color = response.ok ? 'success' : 'error';

      response?.clone().json().then((data: Response) => {
        setState({
          ...state,
          isOpen: true,
          color,
          data: data
        });
      }).catch(
        err => {
          return new AppResponse(
            null,
            response.status,
            response.statusText,
            null,
            null,
            null,
            null
          )
        });

      return response;
    },

    responseError: function (error) {

      error?.clone().json().then((data) => {
        setState({
          ...state,
          isOpen: true,
          color: 'error',
          data
        });
      })
        .catch(
          err =>
            new AppResponse(
              null,
              error.status,
              error.statusText,
              null,
              null,
              null,
              null
            )
        );

      return Promise.reject(error);
    }
  });

  if (state.color === 'error')
    return (
      <Fragment>
        <Dialog
          open={state.isOpen}
          onClose={handleClose}
        >
          <DialogTitle
          >
            Error!
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Description: {state.data.title}
            </DialogContentText>
            <DialogContentText>
              Error ID: {state.data.instance}
            </DialogContentText>
            {
              process.env.ENV === 'production' &&
              <Button
                onClick={() => Sentry.showReportDialog()}
              >
                Report feedback
              </Button>
            }

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary' autoFocus>
              Ok
          </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );

  return null

  return (
    <Snackbar
      open={state.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={state.color}
      >
        {state.data.title}
      </Alert>
    </Snackbar>
  );
}
