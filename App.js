import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import combineReducers from './reducers';
import  RouterComponent from './RouterComponent';
import firebase from 'firebase';

const firebaseConfig = require('./firebase.json');

export const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));

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
