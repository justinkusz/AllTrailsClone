import firebase from "firebase";
import { uploadTrackSnapshot } from "./FileUpload";
import { generateStats } from "./Location";

export const saveRecording = ({
  rating,
  title,
  description,
  locations,
  snapshot
}) => {
  const userId = firebase.auth().currentUser.uid;
  const userRef = firebase.database().ref("users/" + userId);
  const stats = generateStats(locations);

  const track = { rating, title, description, locations, stats };

  return new Promise((resolve, reject) => {
    userRef
      .child("tracks")
      .push(track)
      .then(ref => {
        track.id = ref.key;
        uploadTrackSnapshot(snapshot, ref.key).then(url => {
          track.snapshotURL = url;
          resolve(track);
        });
      });
  });
};

export const updateLifetimeStats = stats => {
  const userId = firebase.auth().currentUser.uid;
  const userRef = firebase.database().ref("/users/" + userId);

  const statsRef = userRef.child("stats");

  return new Promise((resolve, reject) => {
    let promises = [];

    promises.push(
      statsRef.child("hikes").transaction(numHikes => {
        return (numHikes || 0) + 1;
      }),
      statsRef.child("distance").transaction(totalDistance => {
        return (totalDistance || 0) + stats.distance;
      }),
      statsRef.child("elevation").transaction(totalElevation => {
        return (totalElevation || 0) + stats.elevation;
      }),
      statsRef.child("time").transaction(totalTime => {
        return (totalTime || 0) + stats.time;
      })
    );

    Promise.all(promises)
      .then(() => {
        statsRef.once("value", snapshot => {
          const updatedStats = snapshot.toJSON();
          resolve(updatedStats);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};
