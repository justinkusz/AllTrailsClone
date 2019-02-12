import {
  PROFILE_PHOTO_URL_UPDATED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  DISPLAY_NAME_CHANGED,
  PROFILE_PHOTO_PICKED,
  STATS_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  displayName: "",
  profilePhotoURL: "",
  profilePhoto: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE_PHOTO_URL_UPDATED:
      return { ...state, profilePhotoURL: action.payload };
    case PROFILE_PHOTO_PICKED:
      return { ...state, profilePhoto: action.payload };
    case FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload };
    case DISPLAY_NAME_CHANGED:
      return { ...state, displayName: action.payload };
    case STATS_CHANGED:
      return { ...state, stats: action.payload };
    default:
      return state;
  }
};
