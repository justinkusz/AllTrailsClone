import firebase from 'firebase';
import { uploadTrackSnapshot } from './FileUploadActions';

import { RECORDER_STARTED,
    RECORDER_STOPPED,
    RECORDED_LOCATION,
    RECORDER_RESET,
    HIKE_ADDED,
    STATS_CHANGED,
    RECORDING_RATED,
    SAVED_RECORDING, 
    RECORDING_TITLE_CHANGED,
    RECORDING_DESC_CHANGED,
    STATS_UPDATED,
    SNAPSHOT_TAKEN} from './types';

export const recorderStarted = () => {
    return {
        type: RECORDER_STARTED
    };
};

export const recorderStopped = (locations) => {
    return {
        type: RECORDER_STOPPED,
        payload: locations
    };
};

export const recordedLocation = (location) => {
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

export const ratedRecording = (rating) => {
    return {
        type: RECORDING_RATED,
        payload: rating
    };
};

export const recordingTitleChanged = (title) => {
    return {
        type: RECORDING_TITLE_CHANGED,
        payload: title
    };
};

export const recordingDescriptionChanged = (description) => {
    return {
        type: RECORDING_DESC_CHANGED,
        payload: description
    }
};

export const savedRecording = (locations, rating, title, description, snapshot) => {
    return (dispatch) => {
        const userId = firebase.auth().currentUser.uid;
        const userRef = firebase.database().ref('users/' + userId);
    
        const stats = generateStats(locations);
    
        const track = {
            stats: stats,
            locations: locations,
            rating: rating,
            title: title,
            description: description
        };
    
        userRef.child('tracks').push(track).then((ref) => {
            track.key = ref;

            uploadTrackSnapshot(dispatch, snapshot, ref.key);

            // dispatch({
            //     type: HIKE_ADDED,
            //     payload: track
            // });

        }).then(() => {
            updateLifetimeStats(stats, dispatch);
        });
    };
};

export const snapshotTaken = (uri) => {
    return {
        type: SNAPSHOT_TAKEN,
        payload: uri
    };
};

updateLifetimeStats = (stats, dispatch) => {
    const userId = firebase.auth().currentUser.uid;
    const userRef = firebase.database().ref('/users/' + userId);

    const statsRef = userRef.child('stats');

    let promises = [];

    promises.push(
        statsRef.child('hikes').transaction((numHikes) => {
            return (numHikes || 0) + 1;
        }),
        statsRef.child('distance').transaction((totalDistance) => {
            return (totalDistance || 0) + stats.distance;
        }),
        statsRef.child('elevation').transaction((totalElevation) => {
            return (totalElevation || 0) + stats.elevation;
        }),
        statsRef.child('time').transaction((totalTime) => {
            return (totalTime || 0) + stats.time;
        })
    );
    
    Promise.all(promises).then(() => {
        statsRef.once('value', (snapshot) => {
            const updatedStats = snapshot.toJSON();

            dispatch({
                type: STATS_CHANGED,
                payload: updatedStats
            });
        });
    });
    
};

export const updateStats = (locations) => {
    const distance = haversine(locations);
    const time = locations[locations.length-1].timestamp - locations[0].timestamp;
    const rate = Number.parseFloat((time / (1000 * 60)) / distance).toPrecision(1);

    const stats = {
        distance: Number.parseFloat(distance).toPrecision(2),
        rate: rate
    };

    return {
        type: STATS_UPDATED,
        payload: stats
    };
}

const generateStats = (locations) => {
    const distance = haversine(locations);
    const elevation = gain(locations);
    const time = locations[locations.length-1].timestamp - locations[0].timestamp;

    const date = new Date(Date.now()).toDateString();
    const startTime = new Date(locations[0].timestamp).toLocaleTimeString();
    const endTime = new Date(locations[locations.length-1].timestamp).toLocaleTimeString();

    const stats = {
        date: date,
        startTime: startTime,
        endTime: endTime,
        distance: distance,
        elevation: elevation,
        time: time
    };

    return stats;
}

const gain = (locations) => {
    let total = 0;

    for (i = 0; i < locations.length - 1; i++) {
        const elevation1 = locations[i].coords.altitude;
        const elevation2 = locations[i+1].coords.altitude;

        const d = elevation2 - elevation1;

        total += (d > 0) ? d : 0;
    };

    return total;
}

const haversine = (locations) => {
    let distance = 0;
    const R = 6371;

    for (i = 0; i < locations.length - 1; i++) {
        const lat2 = locations[i+1].coords.latitude;
        const lon2 = locations[i+1].coords.longitude;

        const lat1 = locations[i].coords.latitude;
        const lon1 = locations[i].coords.longitude;

        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const d = R * c;

        distance += d;
    };

    return distance;

};

const toRad = (degrees) => {
    return degrees * Math.PI / 180;
};