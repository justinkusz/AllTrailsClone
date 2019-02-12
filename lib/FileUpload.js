import firebase from "firebase";

export const uploadProfilePicture = (dispatch, uri) => {
  const userId = firebase.auth().currentUser.uid;
  const uploadPath = "users/" + userId + "/images/profilePic.jpg";
  const uploadLocationRef = firebase
    .storage()
    .ref()
    .child(uploadPath);

  return getBlob(uri).then(blob => {
    uploadLocationRef.put(blob).then(snapshot => {
      snapshot.ref.getDownloadURL().then(URL => {
        changedProfilePictureURL(dispatch, URL);
      });
    });
  });
};

export const uploadTrackSnapshot = (uri, trackKey) => {
  const userId = firebase.auth().currentUser.uid;
  const uploadPath =
    "users/" + userId + "/images/tracks/" + trackKey + "/snapshot.jpg";
  const uploadLocationRef = firebase
    .storage()
    .ref()
    .child(uploadPath);

  const trackRef = firebase
    .database()
    .ref("users/" + userId + "/tracks/" + trackKey);

  return new Promise((resolve, reject) => {
    getBlob(uri)
      .then(blob => {
        uploadLocationRef.put(blob).then(snapshot => {
          blob.close();
          snapshot.ref.getDownloadURL().then(url => {
            trackRef.child("snapshotURL").set(url);
            resolve(url);
          });
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getBlob = uri => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.onload = () => {
      resolve(request.response);
    };
    request.onerror = error => {
      reject(new Error(error));
    };
    request.responseType = "blob";
    request.open("GET", uri, true);
    request.send(null);
  });
};
