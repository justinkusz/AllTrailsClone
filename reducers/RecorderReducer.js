import {
  RECORDER_STARTED,
  RECORDER_STOPPED,
  RECORDED_LOCATION,
  RECORDER_RESET,
  RECORDING_RATED,
  RECORDING_TITLE_CHANGED,
  RECORDING_DESC_CHANGED,
  SNAPSHOT_TAKEN,
  STATS_UPDATED,
  SAVED_RECORDING
} from "../actions/types";

const INITIAL_STATE = {
  recording: false,
  recordingStarted: false,
  locations: [],
  latlngs: [],
  rating: null,
  title: "",
  description: "",
  stats: { distance: 0, rate: 0 }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECORDER_STARTED:
      return {
        ...state,
        recording: true,
        recordingStarted: true
      };
    case RECORDER_STOPPED:
      return {
        ...state,
        recording: false,
        locations: state.locations.concat(action.payload)
      };
    case RECORDER_RESET:
      return {
        ...state,
        recording: false,
        recordingStarted: false,
        locations: [],
        latlngs: [],
        stats: { distance: 0, rate: 0 }
      };
    case RECORDED_LOCATION:
      const { latitude, longitude } = action.payload.coords;
      return {
        ...state,
        locations: [...state.locations, action.payload],
        latlngs: [
          ...state.latlngs,
          { latitude: latitude, longitude: longitude }
        ]
      };
    case RECORDING_RATED:
      return {
        ...state,
        rating: action.payload
      };
    case RECORDING_TITLE_CHANGED:
      return {
        ...state,
        title: action.payload
      };
    case RECORDING_DESC_CHANGED:
      return {
        ...state,
        description: action.payload
      };
    case SNAPSHOT_TAKEN:
      return {
        ...state,
        snapshot: action.payload
      };
    case STATS_UPDATED:
      return {
        ...state,
        stats: action.payload
      };
    default:
      return state;
  }
};
