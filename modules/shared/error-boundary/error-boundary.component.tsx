import { Button, Typography } from "@mui/material";
import * as Sentry from "@sentry/browser";
import { Component, ErrorInfo, Fragment } from "react";

interface State {
  hasError?: boolean;
  eventId?: any;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export default class ErrorBoundary extends Component {
  state: State;

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);

    this.setState({
      ...this.state,
      error,
      errorInfo,
    });

    if (process.env.ENV !== "production") return;
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo as any);
      const eventId = Sentry.captureException(error);
      this.setState({
        ...this.state,
        eventId,
      });
    });
  }

  render() {
    if (this.state.hasError) {
      //render fallback UI
      return (
        <Fragment>
          <Typography variant="h1">Oops, something went wrong :(</Typography>
          <Typography variant="subtitle1">
            Description: {this.state.error.toString()}
          </Typography>
          <Typography variant="subtitle2">
            Where it occured: {this.state.errorInfo.componentStack}
          </Typography>
          {process.env.ENV === "production" && (
            <Button
              onClick={() =>
                Sentry.showReportDialog({ eventId: this.state.eventId })
              }
            >
              Report feedback
            </Button>
          )}
        </Fragment>
      );
    }

    //when there's not an error, render children untouched
    return this.props.children;
  }
}
