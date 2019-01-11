import { HIKE_ADDED, HIKES_FETCHED } from '../actions/types';

const INITIAL_STATE = {
    tracks: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HIKE_ADDED:
            return { 
                ...state,
                tracks: [...state.tracks, action.payload]
            };
        case HIKES_FETCHED:
            return {
                ...state,
                tracks: action.payload
            }
        default:
            return state;
    };
};