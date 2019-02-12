import React from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

import { fetchHikes, trackSelected } from "../actions";
import HikeCard from "./common/HikeCard";

class Hikes extends React.Component {
  constructor(props) {
    super(props);

    this.props.fetchHikes();
  }

  renderHikes = () => {
    const hikes = this.props.tracks;

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.onRefresh}
          />
        }
        data={hikes}
        renderItem={({ item: track }) => this.renderHikeCard(track)}
        keyExtractor={track => track.id}
      />
    );
  };

  onRefresh = () => {
    this.props.fetchHikes();
  };

  onTapHikeCard = track => {
    this.props.trackSelected(track);
    Actions.viewRecording();
  };

  renderHikeCard = track => (
    <TouchableOpacity onPress={() => this.onTapHikeCard(track)}>
      <HikeCard track={track} />
    </TouchableOpacity>
  );

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
