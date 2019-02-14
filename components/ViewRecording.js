import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";

import StarRating from "./common/StarRating";
import { msToTimeString } from "../lib/Conversions";

class ViewRecording extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      snapshotURL,
      rating,
      stats,
      title,
      description
    } = this.props.track;
    const distance = Number.parseFloat(stats.distance).toPrecision(2) + " km";
    const elevation = Number.parseFloat(stats.elevation).toPrecision(4) + " m";
    const time = msToTimeString(stats.time);

    return (
      <ScrollView>
        <Card
          key={id}
          image={{ uri: snapshotURL }}
          imageProps={{ resizeMode: "cover" }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
          <Text>{stats.date}</Text>
          <StarRating rating={rating} />
        </Card>

        <Card title="Description">
          <Text>{description}</Text>
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

        {this.renderPhotos()}
      </ScrollView>
    );
  }

  renderPhotos = () => {
    if (!this.props.photos) {
      return null;
    }

    return <Card title="Photos" />;
  };
}

const mapStateToProps = state => {
  const { track } = state.scene;
  return { track };
};

export default connect(
  mapStateToProps,
  {}
)(ViewRecording);
