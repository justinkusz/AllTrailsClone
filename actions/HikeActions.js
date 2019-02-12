import firebase from "firebase";

import {
  HIKE_ADDED,
  HIKES_FETCH_STARTED,
  HIKES_FETCH_ERROR,
  HIKES_FETCHED,
  HIKE_REMOVED,
  HIKE_UPDATED,
  TRACK_SELECTED
} from "./types";

export const hikeAdded = track => {
  return {
    type: HIKE_ADDED,
    payload: track
  };
};

export const hikeUpdated = track => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref("users/" + userId);
    const { id, title, description, rating } = track;

    return userRef
      .child("tracks/" + id)
      .update({ title, description, rating })
      .then(() => {
        dispatch({
          type: HIKE_UPDATED,
          payload: track
        });

        dispatch({
          type: TRACK_SELECTED,
          payload: track
        });
      });
  };
};

export const hikeRemoved = track => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref("users/" + userId);
    const trackRef = userRef.child("tracks/" + track.id);
    return trackRef.remove().then(() => {
      dispatch({
        type: HIKE_REMOVED,
        payload: track
      });
    });
  };
};

export const fetchHikes = () => {
  return dispatch => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref("users/" + userId);
    let hikes = [];

    dispatch({ type: HIKES_FETCH_STARTED });

    userRef
      .child("tracks")
      .once("value", snapshot => {
        const tracks = snapshot.toJSON();

        for (let key in tracks) {
          let hike = tracks[key];

          hike.id = key;

          hikes.push(hike);
        }

        dispatch({
          type: HIKES_FETCHED,
          payload: hikes
        });
      })
      .catch(error => {
        dispatch({
          type: HIKES_FETCH_ERROR,
          payload: error
        });
      });
  };
};
