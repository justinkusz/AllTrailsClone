import React from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Stopwatch } from 'react-native-stopwatch-timer';
import { Location, Permissions, TaskManager, MapView, takeSnapshotAsync } from "expo";

import {
  recorderStarted,
  recorderStopped,
  locationChanged,
  recordedLocation,
  recorderReset,
  savedRecording,
  snapshotTaken,
  updateStats
} from "../actions";

import { store } from '../App';

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

class Recorder extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.LOCATION).then(result => {
      const { status } = result;

      if (status === "granted") {
        Location.getCurrentPositionAsync({})
          .then(location => {
            this.props.locationChanged(location.coords);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  // componentWillUnmount() {
  //     BackgroundGeolocation.stop();
  //     BackgroundGeolocation.events.forEach(event => BackgroundGeolocation.removeAllListeners(event));
  // }

  onPressStart = () => {
    const options = {
      accuracy: Location.Accuracy.High
    };

    Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then((started) => {
      if (!started) {
        Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, options).then(() => {
          this.props.recorderStarted();
        });
      } else {
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).then(() => {
          this.props.recorderStopped(this.props.locations);
        });
      }
    });
  };

  onPressDiscard = () => {
    Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then((started) => {
      if (started) {
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).then(() => {
          this.props.recorderReset();
        });
      } else {
        this.props.recorderReset();
      }
    });
  };

  onPressSave = () => {
    Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then((started) => {
      if (started) {
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).then(() => {
          // this.props.savedRecording(this.props.locations);
        });
      } else {
        // this.props.savedRecording(this.props.locations);
      }
    });

    this.takeSnapshot().then((uri) => {
      this.props.snapshotTaken(uri);
      Actions.push('editHike');
    });
  };

  renderSaveButton = () => {
    if (this.props.recordingStarted) {
      return (
        <TouchableOpacity onPress={this.onPressSave}>
          <Icon color="lightyellow" name="save" size={50} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  renderDiscardButton = () => {
    if (this.props.recordingStarted) {
      return (
        <TouchableOpacity onPress={this.onPressDiscard}>
          <Icon color="lightgrey" name="delete" size={50} />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  renderPhotoButton = () => {
    if (this.props.recordingStarted) {
      return (
        <TouchableOpacity>
          <Icon color="lightblue" name="photo-camera" size={50} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  renderWaypointButton = () => {
    if (this.props.recordingStarted) {
      return (
        <TouchableOpacity>
          <Icon color="green" name="add-location" size={50} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  renderTimer = () => {
    const options = {
        container: {
          alignItems: 'center',
          backgroundColor: 'green',
          padding: 5,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5
        },
        text: {
          fontSize: 30,
          color: '#FFF'
        }
    };
    // return (
    //     <Stopwatch
    //         start={this.props.recording}
    //         reset={!this.props.recordingStarted}
    //         options={options}
    //         // getTime={(time) => console.log(time)}
    //     />
    // );
  };

  renderDistance = () => {
    return (
      <View style={styles.recordingStatsContainer}>
        <Text style={styles.recordingStatsText}>
          {this.props.stats.distance} km
        </Text>
      </View>
    );
  };

  renderRate = () => {
    return (
      <View style={styles.recordingStatsContainer}>
        <Text style={styles.recordingStatsText}>
          {this.props.stats.rate} min/km
        </Text>
      </View>
    );
  };

  renderRecordingStatsBar = () => {
    if (!this.props.recordingStarted) {
      return null;
    }

    return (
      <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          {this.renderDistance()}
          {this.renderTimer()}
          {this.renderRate()}
        </View>
      </View>
    );
  };

  renderButtonGroup = () => {
    const title = this.props.recording ? "Stop" : "Start";
    const iconName = this.props.recording
      ? "pause-circle-filled"
      : "play-circle-filled";

    return (
      <View style={{ position: "absolute", bottom: 0, alignSelf: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-end"
          }}
        >
          {this.renderPhotoButton()}

          {this.renderWaypointButton()}

          <TouchableOpacity onPress={this.onPressStart}>
            <Icon color="red" name={iconName} size={75} />
          </TouchableOpacity>

          {this.renderSaveButton()}

          {this.renderDiscardButton()}
        </View>
      </View>
    );
  };

  renderReactNativeMap = () => {
    return (
      <MapView
        ref={map => {
          this.map = map;
        }}
        style={{ flex: 1 }}
        showsUserLocation={true}
        followsUserLocation={true}
        mapType="hybrid"
        showsTraffic={false}
        loadingEnabled={true}
        showsMyLocationButton={true}
        region={{
          latitude: this.props.coords.latitude,
          longitude: this.props.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}
      >
        <MapView.Polyline
          coordinates={this.props.latlngs}
          strokeWidth={6}
          strokeColor="red"
        />
      </MapView>
    );
  };

  render() {
    const long = this.props.coords.longitude;
    const lat = this.props.coords.latitude;

    if (long === undefined || lat === undefined) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {this.renderReactNativeMap()}
        {this.renderRecordingStatsBar()}
        {this.renderButtonGroup()}
      </View>
    );
  }

  takeSnapshot = () => {
    const snapshot = takeSnapshotAsync(this.map, {
      format: "jpg",
      quality: 0.8
    });

    return snapshot;
  };
}

const styles = StyleSheet.create({
  statsBar: {
    flexDirection: "row",
    alignContent: "space-between"
  },
  recordingStatsContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    padding: 5,
    flexDirection: "row",
    flex: 1
  },
  recordingStatsText: {
    fontSize: 14,
    color: "#FFF"
  }
});

const mapStateToProps = state => {
  const coords = state.location.coords;

  const {
    recording,
    recordingStarted,
    locations,
    latlngs,
    stats
  } = state.recorder;

  return {
    coords: coords,
    recording: recording,
    recordingStarted: recordingStarted,
    locations: locations,
    latlngs: latlngs,
    stats: stats
  };
};

export default connect(
  mapStateToProps,
  {
    recorderStarted,
    recorderStopped,
    recordedLocation,
    locationChanged,
    recorderReset,
    savedRecording,
    snapshotTaken,
    updateStats
  }
)(Recorder);
