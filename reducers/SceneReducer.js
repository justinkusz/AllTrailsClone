import { TRACK_SELECTED } from "../actions/types";

const INITIAL_STATE = {
  track: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACK_SELECTED:
      return {
        ...state,
        track: action.payload
      };
    default:
      return state;
  }
};
