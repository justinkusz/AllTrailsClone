import { LOCATION_CHANGED } from './types';

export const locationChanged = (coordinates) => {
    return {
        type: LOCATION_CHANGED,
        payload: coordinates
    };
};