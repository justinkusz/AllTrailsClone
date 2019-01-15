import {
    HIKE_ADDED,
    HIKES_FETCH_STARTED,
    HIKES_FETCH_ERROR,
    HIKES_FETCHED,
    HIKE_REMOVED,
    HIKE_UPDATED
} from '../actions/types';

const INITIAL_STATE = {
    tracks: [],
    loading: false,
    error: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HIKE_ADDED:
            return { 
                ...state,
                tracks: [...state.tracks, action.payload]
            };
        case HIKE_REMOVED:
            return {
                ...state,
                tracks: state.tracks.filter(track => track.key !== action.payload.key)
            }
        case HIKES_FETCH_STARTED:
            return {
                ...state,
                loading: true
            }
        case HIKES_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case HIKES_FETCHED:
            return {
                ...state,
                tracks: action.payload,
                loading: false,
                error: null
            }
        case HIKE_UPDATED:
            return {
                ...state,
                tracks: state.tracks.map((track) => {
                    if (track.id !== action.payload.id) {
                        return track;
                    }
                    return action.payload;
                })
            }
        default:
            return state;
    };
};