import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import { uploadProfilePicture } from "../lib/FileUpload";

import {
  PROFILE_PHOTO_URL_UPDATED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  DISPLAY_NAME_CHANGED,
  PROFILE_PHOTO_PICKED,
  STATS_CHANGED
} from "./types";

export const pickedProfilePhoto = (uri, data) => {
  return dispatch => {
    uploadProfilePicture(dispatch, uri).then(() => {
      changedProfilePicture(dispatch, uri);
    });
  };
};

const changedProfilePicture = (dispatch, uri) => {
  dispatch({
    type: PROFILE_PHOTO_PICKED,
    payload: uri
  });
};

export const changedFirstName = text => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text
  };
};

export const changedLastName = text => {
  return {
    type: LAST_NAME_CHANGED,
    payload: text
  };
};

export const statsChanged = stats => {
  return {
    type: STATS_CHANGED,
    payload: stats
  };
};

const changedDisplayName = (dispatch, text) => {
  dispatch({
    type: DISPLAY_NAME_CHANGED,
    payload: text
  });
};

const changedProfilePictureURL = (dispatch, URL) => {
  dispatch({
    type: PROFILE_PHOTO_URL_UPDATED,
    payload: URL
  });
};

const updateProfile = (dispatch, { profilePhotoURL, displayName }) => {
  return firebase
    .auth()
    .currentUser.updateProfile({
      displayName: displayName,
      photoURL: profilePhotoURL
    })
    .then(() => {
      changedDisplayName(dispatch, displayName);
      changedProfilePictureURL(dispatch, profilePhotoURL);
    })
    .catch(error => {
      console.log("Error updating profile: " + error.message);
    });
};

export const updatedProfile = ({ profilePhotoURL, displayName }) => {
  return dispatch => {
    updateProfile(dispatch, { profilePhotoURL, displayName }).then(() => {
      Actions.home();
    });
  };
};
