import { haversine } from "../lib/Location";
import {
  RECORDER_STARTED,
  RECORDER_STOPPED,
  RECORDED_LOCATION,
  RECORDER_RESET,
  STATS_CHANGED,
  RECORDING_RATED,
  RECORDING_TITLE_CHANGED,
  RECORDING_DESC_CHANGED,
  STATS_UPDATED,
  SNAPSHOT_TAKEN
} from "./types";

export const recorderStarted = () => {
  return {
    type: RECORDER_STARTED
  };
};

export const recorderStopped = locations => {
  return {
    type: RECORDER_STOPPED,
    payload: locations
  };
};

export const recordedLocation = location => {
  return {
    type: RECORDED_LOCATION,
    payload: location
  };
};

export const recorderReset = () => {
  return {
    type: RECORDER_RESET
  };
};

export const ratedRecording = rating => {
  return {
    type: RECORDING_RATED,
    payload: rating
  };
};

export const recordingTitleChanged = title => {
  return {
    type: RECORDING_TITLE_CHANGED,
    payload: title
  };
};

export const recordingDescriptionChanged = description => {
  return {
    type: RECORDING_DESC_CHANGED,
    payload: description
  };
};

export const snapshotTaken = uri => {
  return {
    type: SNAPSHOT_TAKEN,
    payload: uri
  };
};

export const updateStats = locations => {
  var distance;
  var time;
  var rate;

  if (locations.length < 2) {
    distance = 0;
    time = 0;
    rate = 0;
  } else {
    distance = haversine(locations);
    time = locations[locations.length - 1].timestamp - locations[0].timestamp;
    rate = Number.parseFloat((time || 0) / (1000 * 60) / distance).toPrecision(
      2
    );
  }

  const stats = {
    distance: Number.parseFloat(distance).toPrecision(2),
    rate: rate
  };

  return {
    type: STATS_UPDATED,
    payload: stats
  };
};
