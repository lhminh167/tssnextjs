// @flow weak

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { makeStyles, Theme } from "@material-ui/core/styles";

// import { withStyles } from '@material-ui/core/styles'
import ValueViewer from './valueViewer.component' // for examples only - displays the table above slider
import { SliderRail, Handle, Track, Tick } from './slider.component' // example render components - source below
import { ChangeEvent, useState } from "react";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
    },
    slider: {
        position: 'relative',
        width: '100%',
    },
    valueView: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
    },
    item: {}
}));

const domain = [100, 500]
const defaultValues = [150, 300]

function TwoHandleSlider(props) {
    const classes = useStyles(props);

    const [values, setValues] = useState(defaultValues.slice());
    const [update, setUpdate] = useState(defaultValues.slice());

    const onUpdate = update => {
        setUpdate(update)
    }

    const onChange = values => {
        setValues(values)
    }

    return (
        <div className={classes.root}>
            <ValueViewer values={values} update={update} />
            <Slider
                mode={1}
                step={1}
                domain={domain}
                className={classes.slider}
                onUpdate={onUpdate}
                onChange={onChange}
                values={values}
            >
                <Rail>
                    {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                </Rail>
                <Handles>
                    {({ activeHandleID, handles, getHandleProps }) => (
                        <div>
                            {handles.map(handle => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    domain={domain}
                                    activeHandleID={activeHandleID}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks left={false} right={false}>
                    {({ tracks, getTrackProps }) => (
                        <div>
                            {tracks.map(({ id, source, target }) => (
                                <Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
            </Slider>
            <div className={classes.valueView}>
                {values.map((value, index) => (
                    <div key={index} className={classes.item}>{value}</div>
                ))}
            </div>
        </div>
    )
}


// TwoHandleSlider.propTypes = {
//   classes: PropTypes.object.isRequired,
// }

export default TwoHandleSlider
