import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import StarRating from "./common/StarRating";
import { connect } from "react-redux";

class ViewRecording extends React.Component {
  constructor(props) {
    super(props);
  }

  msToTimeString = duration => {
    const seconds = Math.floor(duration / 1000) % 60;
    const minutes = Math.floor(duration / (1000 * 60)) % 60;
    const hours = Math.floor(duration / (1000 * 60 * 60)) % 24;
    const days = Math.floor(duration / (1000 * 60 * 60 * 24));

    const D = days > 0 ? days + " days, " : "";

    return D + hours + ":" + minutes + ":" + seconds;
  };

  render() {
    const { track } = this.props;
    const { id, snapshotURL, rating, stats } = track;
    const distance =
      Number.parseFloat(track.stats.distance).toPrecision(2) + " km";
    const elevation =
      Number.parseFloat(track.stats.elevation).toPrecision(4) + " m";
    const time = this.msToTimeString(track.stats.time);

    return (
      <ScrollView>
        <Card
          key={id}
          image={{ uri: snapshotURL }}
          imageProps={{ resizeMode: "cover" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {track.title}
          </Text>
          <Text>{stats.date}</Text>
          <StarRating rating={rating} />
        </Card>

        <Card title="Description">
          <Text>{track.description}</Text>
        </Card>

        <Card title="Stats">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Distance: {distance}</Text>
            <Text>Elevation gain: {elevation}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>Total time: {time}</Text>
          </View>
        </Card>

        <Card title="Photos" />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const { track } = state.scene;
  return { track };
};

export default connect(
  mapStateToProps,
  {}
)(ViewRecording);
