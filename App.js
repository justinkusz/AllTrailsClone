import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import combineReducers from './reducers';
import  RouterComponent from './RouterComponent';
import firebase from 'firebase';
import { TaskManager } from 'expo';

import { recordedLocation, updateStats } from './actions';

const firebaseConfig = require('./firebase.json');

const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const {locations} = data;
    const newLocation = locations[locations.length-1];
    store.dispatch(recordedLocation(newLocation));
    store.dispatch(updateStats(store.getState().recorder.locations));
  }
});

export default class App extends React.Component {

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <RouterComponent></RouterComponent>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
