import firebase from 'firebase';

import { HIKE_ADDED, HIKES_FETCHED } from './types';

export const hikeAdded = (track) => {
    return {
        type: HIKE_ADDED,
        payload: track
    };
};

const hikesFetched = (hikes) => {
    return {
        type: HIKES_FETCHED,
        payload: hikes
    };
};

export const fetchHikes = () => {
    return (dispatch) => {
        const userId = firebase.auth().currentUser.uid;
        const userRef = firebase.database().ref('/users/' + userId);

        let hikes = [];
    
        userRef.child('tracks').once('value', (snapshot) => {
            const tracks = snapshot.toJSON();

            for (let key in tracks) {
                let hike = tracks[key];

                hike.key = key;

                hikes.push(hike);
            };

            dispatch({
                type: HIKES_FETCHED,
                payload: hikes
            });

        });
    };
    
};