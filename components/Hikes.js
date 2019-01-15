import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { fetchHikes, trackSelected } from "../actions";
import StarRating from "./common/StarRating";
import { Actions } from "react-native-router-flux";

class Hikes extends React.Component {
  constructor(props) {
    super(props);

    this.props.fetchHikes();
  }

  msToTimeString = duration => {
    const seconds = Math.floor(duration / 1000) % 60;
    const minutes = Math.floor(duration / (1000 * 60)) % 60;
    const hours = Math.floor(duration / (1000 * 60 * 60)) % 24;
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    const D = days > 0 ? days + " days, " : "";

    return D + hours + ":" + minutes + ":" + seconds;
  };

  mToDistanceString = distance => {
    if (distance > 1000) {
      return Number.parseFloat(distance).toPrecision(2) + " km";
    } else {
      return Number.parseFloat(distance).toPrecision(2) + " m";
    }
  };

  renderHikes = () => {
    const hikes = this.props.tracks;

    return (
      <FlatList
        data={hikes}
        renderItem={({ item: track }) => this.renderHikeCard(track)}
        keyExtractor={track => track.id}
      />
    );
  };

  onTapHikeCard = track => {
    this.props.trackSelected(track);
    Actions.viewRecording();
  };

  renderHikeCard = track => {
    // const time = this.msToTimeString(track.stats.time);
    // const distance = Number.parseFloat(track.stats.distance).toPrecision(2) + ' km';
    // const elevation = Math.floor(track.stats.elevation) + ' m';

    return (
      <TouchableWithoutFeedback onPress={() => this.onTapHikeCard(track)}>
        <Card
          key={track.id}
          image={{ uri: track.snapshotURL }}
          imageProps={{ resizeMode: "cover" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {track.title}
          </Text>
          <StarRating rating={track.rating} />
          <Text>{track.stats.date}</Text>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    if (this.props.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }
    if (this.props.tracks.length < 1) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>
            This is where my <Text style={{ color: "green" }}>hikes</Text> will
            be displayed!
          </Text>
        </View>
      );
    }
    return <View style={{ flex: 1 }}>{this.renderHikes()}</View>;
  }
}

const mapStateToProps = state => {
  const { tracks, error, loading } = state.hikes;

  return { tracks, error, loading };
};

export default connect(
  mapStateToProps,
  { fetchHikes, trackSelected }
)(Hikes);