import { TRACK_SELECTED } from "./types";

export const trackSelected = track => {
  return {
    type: TRACK_SELECTED,
    payload: track
  };
};
