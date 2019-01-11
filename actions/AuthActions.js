import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { EMAIL_CHANGED, 
    PASSWORD_CHANGED, 
    LOGIN_USER_SUCCESS, 
    LOGIN_ATTEMPTED, 
    LOGIN_USER_FAIL, 
    STATS_CHANGED} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const checkAuthenticationStatus = () => {
    return (dispatch) => {
        const user = firebase.auth().currentUser;

        if (user) {
            loginSuccess(dispatch, user);
        }
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

const loginAttempted = (dispatch) => {
    dispatch({ type: LOGIN_ATTEMPTED });
};

const loginFail = (dispatch, message) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: message
    });
};

const loginSuccess = (dispatch, user) => {

    const userId = user.uid;
    const userRef = firebase.database().ref('users/' + userId);

    userRef.once('value').then((snapshot) => {
        const userStats = snapshot.child('stats').val();

        dispatch({
            type: STATS_CHANGED,
            payload: userStats
        });

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
        });
        Actions.reset('home');
    });
    
};

const signupSucess = (dispatch, user) => {

    
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.signup();
}

const initializeUser = (dispatch, user) => {
    const userId = user.uid;
    const userRef = firebase.database().ref('/users/' + userId);

    const userData = {
        stats: {
            hikes: 0,
            distance: 0,
            elevation: 0,
            time: 0
        },
        hikes: {},
        trails: {}
    };

    return userRef.set(userData).then(() => {
        dispatch({
            type: STATS_CHANGED,
            payload: userData.stats
        });
    });
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        loginAttempted(dispatch);
        console.log('Attempting log in...');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((credential) => loginSuccess(dispatch, credential.user))
            .catch((error) => {
                console.log(error.message);
                switch (error.code) {
                    case 'auth/user-not-found':
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                            .then((credential) => {
                                initializeUser(dispatch, credential.user);
                                signupSucess(dispatch, credential.user);
                            });
                        break;
                    case 'auth/wrong-password':
                        loginFail(dispatch, error.message);
                        break;
                }
            });
    };
};
