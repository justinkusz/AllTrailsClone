import { LOCATION_CHANGED } from "../actions/types";

const INITIAL_STATE = {
  coords: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOCATION_CHANGED:
      return { ...state, coords: action.payload };
    default:
      return state;
  }
};
