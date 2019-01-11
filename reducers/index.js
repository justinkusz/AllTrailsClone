import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import LocationReducer from './LocationReducer';
import RecorderReducer from './RecorderReducer';
import HikeReducer from './HikeReducer';

export default combineReducers({
    auth: AuthReducer,
    profile: ProfileReducer,
    location: LocationReducer,
    recorder: RecorderReducer,
    hikes: HikeReducer
});