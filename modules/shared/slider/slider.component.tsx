import { Theme, withStyles, fade } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { PositionProperty, PointerEventsProperty, TextAlignProperty } from 'csstype';


// *******************************************************
// RAIL COMPONENT
// *******************************************************
const railStyle = (theme: Theme) => ({
  common: {
    position: "absolute" as PositionProperty,
    width: '100%',
    transform: 'translate(0%, -50%)',
  },
  outer: {
    height: 42,
    borderRadius: 21,
    cursor: 'pointer',
    border: '1px solid white',
  },
  inner: {
    height: 4,
    borderRadius: 2,
    pointerEvents: 'none' as PointerEventsProperty,
    backgroundColor: 'rgb(155,155,155)',
    // backgroundColor: "#FAFAFA",
  },
})

function RailComponent({ classes, getRailProps }) {
  return (
    <Fragment>
      <div
        className={clsx(classes.common, classes.outer)}
        {...getRailProps()}
      />
      <div className={clsx(classes.common, classes.inner)} />
    </Fragment>
  )
}

RailComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  getRailProps: PropTypes.func.isRequired,
}

export const SliderRail = withStyles(railStyle)(RailComponent)

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
const handleStyle = theme => {
  const colors = {
    primary: theme.palette.primary.contrastText,
    thumbOutline: fade(theme.palette.primary.contrastText, 0.16),
  }

  return {
    common: {
      position: 'absolute' as PositionProperty,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    },
    outer: {
      zIndex: 2,
      width: 18,
      height: 18,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      backgroundColor: 'white',
      // backgroundColor: 'none',
    },
    inner: {
      zIndex: 3,
      width: 12,
      height: 12,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      backgroundColor: colors.primary,
    },
    active: {
      boxShadow: `0px 0px 0px 16px ${colors.thumbOutline}`,
    },
  }
}

function HandleComponent({
  activeHandleID,
  domain,
  handle,
  classes,
  getHandleProps,
}) {
  const [min, max] = domain as any[];
  const { id, value, percent } = handle;
  const active = activeHandleID === id;
  return (
    <Fragment>
      <div
        className={clsx(classes.common, classes.outer)}
        style={{ left: `${percent}%` }}
        {...getHandleProps(id)}
      />
      <div
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        className={clsx(
          classes.common,
          classes.inner,
          active && classes.active,
        )}
        style={{ left: `${percent}%` }}
      />
    </Fragment>
  )
}

HandleComponent.propTypes = {
  activeHandleID: PropTypes.string,
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  getHandleProps: PropTypes.func.isRequired,
}

export const Handle = withStyles(handleStyle)(HandleComponent)

// *******************************************************
// TRACK COMPONENT
// *******************************************************
const trackStyle = theme => ({
  root: {
    position: 'absolute' as PositionProperty,
    transform: 'translate(0%, -50%)',
    height: 4,
    zIndex: 1,
    borderRadius: 2,
    cursor: 'pointer',
    backgroundColor: theme.palette.primary.contrastText,
  },
})

function TrackComponent({ classes, source, target, getTrackProps }) {
  return (
    <div
      className={classes.root}
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

TrackComponent.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  getTrackProps: PropTypes.func.isRequired,
}

export const Track = withStyles(trackStyle)(TrackComponent)

// *******************************************************
// TICK COMPONENT
// *******************************************************
const tickStyle = theme => ({
  tick: {
    position: 'absolute' as PositionProperty,
    marginTop: 10,
    width: 1,
    height: 5,
    backgroundColor: theme.palette.text.primary,
  },
  label: {
    position: 'absolute' as PositionProperty,
    marginTop: 16,
    textAlign: 'center' as TextAlignProperty,
  },
})

export function TickComponent({ classes, tick, count, format }) {
  return (
    <div>
      <div className={classes.tick} style={{ left: `${tick.percent}%` }} />
      <Typography
        className={classes.label}
        style={{
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </Typography>
    </div>
  )
}

TickComponent.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
}

TickComponent.defaultProps = {
  format: d => d,
}

export const Tick = withStyles(tickStyle)(TickComponent)